using System;
using System.Collections;
using System.Collections.Generic;

using UnityEngine;
using UnityEditor;

using Antlr.StringTemplate;
using Antlr.StringTemplate.Language;

/**
 * 	1. Go through
 * 
 * 
 */
public class J3DExport : ScriptableWizard
{
	public string prefix = "J3D";
	public bool exportHierarchy = true;
	public Transform[] transforms;
	
	private List<TransformExportData> tex;
	private Hashtable mex;
	private Hashtable mtx;

	void OnWizardUpdate ()
	{
		if (transforms == null && Selection.transforms.Length > 0) {
			transforms = Selection.transforms;
		}	
	}

	void OnWizardCreate ()
	{
		tex = new List<TransformExportData> ();
		mex = new Hashtable ();
		mtx = new Hashtable ();
		
		for (var i = 0; i < transforms.Length; i++) {
			RecurseTransform (transforms[i]);
		}
		
		string meshesPath = EditorUtility.SaveFilePanel ("Save meshes", FileExport.lastExportPath, "", "js");
		string scenePath = meshesPath.Substring (0, meshesPath.Length - 3) + "Scene.js";
		
		StringTemplate mt = FileExport.LoadTemplate ("model");
		mt.SetAttribute ("prefix", prefix + "Meshes");
		mt.SetAttribute ("meshes", mex.Values);
		FileExport.SaveContentsAsFile (mt.ToString (), meshesPath);
		
		StringTemplate st = FileExport.LoadTemplate ("scene");
		st.SetAttribute ("prefix", prefix + "Scene");
		st.SetAttribute ("meshPrefix", prefix + "Meshes");
		st.SetAttribute ("transforms", tex);
		st.SetAttribute ("root", tex[0]);
		st.SetAttribute ("meshes", mex.Values);
		st.SetAttribute ("materials", mtx.Values);
		FileExport.SaveContentsAsFile (st.ToString (), scenePath);
		
		FileExport.lastExportPath = meshesPath;
	}
	
	void RecurseTransform (Transform t)
	{
		tex.Add (new TransformExportData (t));
		
		if(t.renderer != null) {
			MeshExportData me = new MeshExportData (t);
			if (!mex.ContainsKey (me.Name))
				mex.Add (me.Name, me);
			
			MaterialExportData mt = new MaterialExportData (t);
			if (!mtx.ContainsKey (mt.Name))
				mtx.Add (mt.Name, mt);
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
