using System;
using UnityEngine;
using UnityEditor;

public class TextureExportData
{
	private Texture t;
	private TextureImporter ti;
	
	public TextureExportData (Texture t)
	{
		this.t = t;
		
		if (IsImage) {
			ti = (TextureImporter)AssetImporter.GetAtPath (Path);
			// Those settings are not applied, only updated in the UI which is very confusing :(
//			ti.isReadable = true;
//			ti.textureFormat = TextureImporterFormat.ARGB32;
		}
	}
	
	private Texture2D t2d {
		get { return t as Texture2D; }
	}
	
	public string Path {
		get { return AssetDatabase.GetAssetPath (t); }
	}
	
	public string Name {
		get { return NamesUtil.CleanLc (t.name); }
	}
	
	public TextureImporterFormat Format {
		get { return ti.textureFormat; }
	}
	
	public string FileName {
		get { return Name + ".png"; }
	}
	
	public bool IsImage 
	{
		get { return t is Texture2D; }
	}
	
	public byte[] pngData
	{
		get { return t2d.EncodeToPNG (); }
	}
}

