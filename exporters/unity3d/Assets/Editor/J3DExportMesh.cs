using System;
using UnityEngine;
using UnityEditor;

using Antlr.StringTemplate;
using Antlr.StringTemplate.Language;

public class J3DExportMesh : ScriptableWizard
{
	public static string projectPath = "/Users/bartekd/webgl/j3d/demo/models/";
	
	public Transform[] meshes;
	private MeshExportData[] mexps;

	void OnWizardUpdate ()
	{
		if (meshes == null && Selection.transforms.Length > 0) {
			meshes = Selection.transforms;
		}	
	}

	void OnWizardCreate ()
	{
		mexps = new MeshExportData[meshes.Length];
		
		for (var i = 0; i < meshes.Length; i++) {
			mexps[i] = new MeshExportData (meshes[i].gameObject);
		}
		
		StringTemplate mt = FileExport.LoadTemplate ("model");
		mt.SetAttribute ("meshes", mexps);
		FileExport.SaveContentsAsFile (mt.ToString (), mexps[0].FileName, projectPath);
	}
	
	[MenuItem("J3D/Export Meshes")]
	static void RenderCubemap ()
	{
		ScriptableWizard.DisplayWizard ("Export to J3D", typeof(J3DExportMesh), "Export");
	}
}
