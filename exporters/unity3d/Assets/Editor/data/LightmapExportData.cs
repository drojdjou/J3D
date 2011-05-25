using UnityEngine;
using System.Collections.Generic;

public class LightmapExportData
{
	private const string NAME_BASE = "lightmap";
	private List<string> lightmapNames;
	
	public LightmapExportData ()
	{
		if (LightmapSettings.lightmapsMode != LightmapsMode.Single) {
			Debug.LogWarning ("Only far lightmaps are currently supported");
		}
		
		lightmapNames = new List<string> ();
		
		for (int i = 0; i < LightmapSettings.lightmaps.Length; i++) {
			lightmapNames.Add (NAME_BASE + i + ".png");
		}
	}
	
	public void SaveFiles ()
	{
		// TODO: Export lightmaps to files (for now it's manual)
	}
}


