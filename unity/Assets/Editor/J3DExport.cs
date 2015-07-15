using System;
using System.Collections;
using System.Collections.Generic;
using System.IO;

using UnityEngine;
using UnityEditor;

using Antlr.StringTemplate;
using Antlr.StringTemplate.Language;

public enum Extension {json, js};

public class J3DExport : ScriptableWizard
{
	public string prefix = "J3D";
	public Extension extenstion;
	public Transform[] transforms;
	
	public float jpegQuality = 75.0f;
	public float lightmapBrightness = 8.0f;
	public float lightmapContrast = 1.1f;
	
	public bool useQuaternions = true;
	public bool exportAnimation = false;
	public bool exportTextures = true;

	public bool exportNormals = true;
	public bool exportTangents = false;
	public bool exportUV2 = false;

	public float samplesPerSec = 30.0f;
	
	public bool useConsole = false;
	//public ReportLevel level = ReportLevel.Warning;
	public bool generateReport = false;
	
	private List<TransformExportData> tex;
	private List<LightExportData> lgx;
	private List<CameraExportData> cmx;
	private List<LightmapExportData> led;
	private List<AnimationExportData> anx;
	
	private Hashtable mex;
	private Hashtable mtx;
	private Hashtable txx;
	
	//private LightmapExportData led;
	
	void OnWizardUpdate ()
	{
		if (transforms == null && Selection.transforms.Length > 0) {
			transforms = Selection.transforms;
		}	
	}
	
	void OnWizardCreate ()
	{
		// Rename all gameobjects so that there are none with the same name
		
		Report.level = ReportLevel.All;
		Report.useConsole = useConsole;
		// TransformExportData.uidc = 1;
		
		Report.log ("Exporting scene: " + EditorApplication.currentScene);
		Report.log ("Platform: " + SystemInfo.operatingSystem);
		Report.log ("Unity player: " + Application.unityVersion);
		
		string meshesPath = EditorUtility.SaveFilePanel ("Save meshes", FileExport.lastExportPath, "", extenstion.ToString ());
		int extl = (extenstion == Extension.js) ? 3 : 5;
		
		string scenePath = meshesPath.Substring (0, meshesPath.Length - extl) + "Scene." + extenstion.ToString ();
		string animPath = meshesPath.Substring (0, meshesPath.Length - extl) + "Anim." + extenstion.ToString ();
		string texturePath = meshesPath.Substring (0, meshesPath.LastIndexOf ("/") + 1);
		string reportPath = meshesPath.Substring (0, meshesPath.Length - extl) + "Log.txt";
		
		Report.log ("Exporting to: " + meshesPath + " " + scenePath);

		tex = new List<TransformExportData> ();
		lgx = new List<LightExportData> ();
		cmx = new List<CameraExportData> ();
		led = new List<LightmapExportData> ();
		anx = new List<AnimationExportData> ();
		
		mex = new Hashtable ();
		mtx = new Hashtable ();
		txx = new Hashtable ();
		
		int i;
		
		for (i = 0; i < transforms.Length; i++) {
			RecurseTransform (transforms[i], null);
		}
		
		for(i = 0; i < LightmapSettings.lightmaps.Length; i++) {
			led.Add( new LightmapExportData(i) );
		}

		StringTemplate mt = FileExport.LoadTemplate ("model");
		mt.SetAttribute ("meshes", mex.Values);
		mt.SetAttribute ("exportNormals", exportNormals);
		mt.SetAttribute ("exportTangents", exportTangents);
		mt.SetAttribute ("exportUV2", exportUV2);
		FileExport.SaveContentsAsFile (FileExport.CleanJSON (mt), meshesPath);
		
		if(exportAnimation) {
			StringTemplate at = FileExport.LoadTemplate ("animation");
			at.SetAttribute ("quaternions", useQuaternions);
			at.SetAttribute ("animations", anx);
			FileExport.SaveContentsAsFile (FileExport.CleanJSON (at), animPath);
		}
		
		StringTemplate st = FileExport.LoadTemplate ("scene");
		st.SetAttribute ("ambient", RenderSettings.ambientLight);
		st.SetAttribute ("quaternions", useQuaternions);
		st.SetAttribute ("exportTextures", exportTextures);
		
		if (Camera.main != null)
			st.SetAttribute ("background", Camera.main.backgroundColor);
		else
			st.SetAttribute ("background", Color.black);
		
		st.SetAttribute ("prefix", prefix + "Scene");
		st.SetAttribute ("meshPrefix", prefix + "Meshes");
		st.SetAttribute ("transforms", tex);
		st.SetAttribute ("root", tex[0]);
		st.SetAttribute ("meshes", mex.Values);
		st.SetAttribute ("materials", mtx.Values);
		st.SetAttribute ("textures", txx.Values);
		st.SetAttribute ("lights", lgx);
		st.SetAttribute ("cameras", cmx);
		st.SetAttribute ("lightmaps", led);
		FileExport.SaveContentsAsFile (FileExport.CleanJSON (st), scenePath);
		
		if(exportTextures) {
			foreach (TextureExportData t in txx.Values) {
				Debug.Log("Saving texture: " + t.Name);
				t.Save(texturePath, jpegQuality);
			}
		}
		
		foreach (LightmapExportData d in led) {
			d.Save(texturePath, jpegQuality, lightmapBrightness, lightmapContrast);
		}
		
		Report.log ("Exported " + tex.Count + " transforms");
		Report.log ("Exported " + txx.Values.Count + " textures");
		Report.log ("Exported " + led.Count + " lightmaps");

		FileExport.lastExportPath = meshesPath;
		
		Report.log ("Done!");
		if(generateReport) Report.saveReport (reportPath);
	}
	
	void RecurseTransform (Transform t, TransformExportData p)
	{
		if (!t.gameObject.activeInHierarchy)
			return;
		
		TransformExportData ted = new TransformExportData (t, p, useQuaternions);
		
		tex.Add (ted);
		
		if (t.GetComponent<Renderer>() != null) {
			MeshExportData me = new MeshExportData (t);
			if (!mex.ContainsKey (me.Name))
				mex.Add (me.Id, me);
			
			List<string> textures = TextureUtil.ExtractTexturesNames (t.GetComponent<Renderer>().sharedMaterial);
			
			MaterialExportData mt = new MaterialExportData (t, textures);
			if (!mtx.ContainsKey (mt.Name))
				mtx.Add (mt.Name, mt);
			
			foreach (string tn in textures) {
				TextureExportData tx = new TextureExportData (t.GetComponent<Renderer>().sharedMaterial.GetTexture (tn));
				if (!txx.ContainsKey (tx.Name)) {
					txx.Add (tx.Name, tx);
				}
			}
			
		}
		
		if (t.GetComponent<Light>() != null) {
			LightExportData ld = new LightExportData (t);
			lgx.Add (ld);
		}
		
		if (t.GetComponent<Camera>() != null) {
			CameraExportData cd = new CameraExportData (t);
			cmx.Add (cd);
		}
		
		if (exportAnimation && t.GetComponent<Animator>() != null) {
			AnimationExportData ad = new AnimationExportData(t, useQuaternions, samplesPerSec);
			anx.Add(ad);
		}
		
		for (var i = 0; i < t.childCount; i++) {
			RecurseTransform (t.GetChild (i), ted);
		}
	}

	[MenuItem("J3D/Export")]
	static void Export ()
	{
		ScriptableWizard.DisplayWizard ("Export to J3D", typeof(J3DExport), "Export");
	}
	
//	[MenuItem("J3D/Inspect Animation")]
//	static void InspectAnimation ()
//	{
//		Transform t = Selection.transforms[0];
//		
//		AnimationClip[] clips = AnimationUtility.GetAnimationClips(t.animation);
//		
//		
//		foreach(AnimationClip c in clips) {
//			AnimationClipCurveData[] data = AnimationUtility.GetAllCurves(c, true);
//			
//			foreach(AnimationClipCurveData d in data) {
//				Debug.Log(d.propertyName);
//				Debug.Log(d.curve.Evaluate(0.33f));
//			}
//		};
//	}
}
