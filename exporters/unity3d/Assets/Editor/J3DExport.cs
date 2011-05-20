using System;
using System.Collections;
using System.Collections.Generic;
using System.IO;

using UnityEngine;
using UnityEditor;

using Antlr.StringTemplate;
using Antlr.StringTemplate.Language;

public class J3DExport : ScriptableWizard
{
	public string prefix = "J3D";
	public bool exportHierarchy = true;
	public Transform[] transforms;
	
	private List<TransformExportData> tex;
	private List<LightExportData> lgx;
	private List<CameraExportData> cmx;
	
	private Hashtable mex;
	private Hashtable mtx;
	private Hashtable txx;
	
	void OnWizardUpdate ()
	{
		if (transforms == null && Selection.transforms.Length > 0) {
			transforms = Selection.transforms;
		}	
	}
	
	void OnWizardCreate ()
	{
		tex = new List<TransformExportData> ();
		lgx = new List<LightExportData> ();
		cmx = new List<CameraExportData> ();
		
		mex = new Hashtable ();
		mtx = new Hashtable ();
		txx = new Hashtable ();
		
		for (var i = 0; i < transforms.Length; i++) {
			RecurseTransform (transforms[i]);
		}
		
		// Some textures might have been marked as readable for exporting, apply those chnage now
		AssetDatabase.Refresh ();
		
		string meshesPath = EditorUtility.SaveFilePanel ("Save meshes", FileExport.lastExportPath, "", "js");
		string scenePath = meshesPath.Substring (0, meshesPath.Length - 3) + "Scene.js";
		string texturePath = meshesPath.Substring (0, meshesPath.LastIndexOf ("/") + 1);

		StringTemplate mt = FileExport.LoadTemplate ("model");
		mt.SetAttribute ("prefix", prefix + "Meshes");
		mt.SetAttribute ("meshes", mex.Values);
		FileExport.SaveContentsAsFile (FileExport.CleanJSON (mt), meshesPath);
		
		StringTemplate st = FileExport.LoadTemplate ("scene");
		st.SetAttribute ("ambient", RenderSettings.ambientLight);
		
		if (Camera.mainCamera != null)
			st.SetAttribute ("background", Camera.mainCamera.backgroundColor);
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
		FileExport.SaveContentsAsFile (FileExport.CleanJSON(st), scenePath);
		
		foreach(TextureExportData t in txx.Values) {
			if(t.IsImage) {
				File.WriteAllBytes (texturePath + t.FileName, t.pngData);
			}
		}
		
		FileExport.lastExportPath = meshesPath;
	}
	
	void RecurseTransform (Transform t)
	{
		if (!t.gameObject.active)
			return;
		
		tex.Add (new TransformExportData (t));
		
		if (t.renderer != null) {
			MeshExportData me = new MeshExportData (t);
			if (!mex.ContainsKey (me.Name))
				mex.Add (me.Name, me);
			
			List<string> textures = TextureUtil.ExtractTexturesNames (t.renderer.sharedMaterial);
			
			MaterialExportData mt = new MaterialExportData (t, textures);
			if (!mtx.ContainsKey (mt.Name))
				mtx.Add (mt.Name, mt);
			
			foreach (string tn in textures) {
				TextureExportData tx = new TextureExportData (t.renderer.sharedMaterial.GetTexture (tn));
				if (!txx.ContainsKey (tx.Name))
					txx.Add (tx.Name, tx);
			}
			
		}
		
		if (t.light != null) {
			LightExportData ld = new LightExportData (t);
			lgx.Add (ld);
		}
		
		if (t.camera != null) {
			CameraExportData cd = new CameraExportData (t);
			cmx.Add (cd);
		}
		
		for (var i = 0; i < t.childCount; i++) {
			RecurseTransform (t.GetChild (i));
		}
	}

	[MenuItem("J3D/Export")]
	static void Export ()
	{
		ScriptableWizard.DisplayWizard ("Export to J3D", typeof(J3DExport), "Export");
	}
}
