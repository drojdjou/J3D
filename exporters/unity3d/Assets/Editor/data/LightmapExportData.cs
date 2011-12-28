using System;
using System.IO;
using UnityEngine;

public class LightmapExportData
{
	private const float MULT = 8.0f;
	private const string NAME_BASE = "lightmap";
	
	private int index;
	private string fileName;
	
	public LightmapExportData (int index)
	{
		this.index = index;
		this.fileName = NAME_BASE + index + ".jpg";
	}
	
	public int Index {
		get {
			return index;
		}
	}
	
	public string FileName {
		get {
			return fileName;
		}
	}
	
	public void Save (string path, float jpegQuality)
	{
		Texture2D ti = LightmapSettings.lightmaps[index].lightmapFar;
		Texture2D tf = new Texture2D(ti.width, ti.height, TextureFormat.ARGB32, false);

		Color32[] c = ti.GetPixels32();

		for(int j = 0; j < c.Length; j++) {
			float af = c[j].a / 255f;
			float rf = c[j].r / 255f;
			float gf = c[j].g / 255f;
			float bf = c[j].b / 255f;
			
			float ur = rf * af * 255f * MULT;
			float ug = gf * af * 255f * MULT;
			float ub = bf * af * 255f * MULT;
			
			ur = Mathf.Clamp(ur, 0, 255);
			ug = Mathf.Clamp(ug, 0, 255);
			ub = Mathf.Clamp(ub, 0, 255);
			
			c[j].r = Convert.ToByte(ur);
			c[j].g = Convert.ToByte(ug);
			c[j].b = Convert.ToByte(ub);
			c[j].a = 255;
		}
		
		tf.SetPixels32(c);			

		JPGEncoder je = new JPGEncoder(tf, jpegQuality);
		byte[] bytes = je.GetBytes();
		
		File.WriteAllBytes (path + fileName, bytes);
		
		Texture2D.DestroyImmediate(tf);
	}
}


