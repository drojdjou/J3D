using System;
using UnityEngine;
using UnityEditor;

public class TextureExportData
{
	private Texture t;
	
	public TextureExportData (Texture t)
	{
		this.t = t;
	}
	
	public TextureImporter asset {
		get { return (TextureImporter)AssetImporter.GetAtPath (Path); }
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
		get { return asset.textureFormat; }
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

