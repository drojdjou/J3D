using System;
using System.IO;
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
		get { 
			if(Format == TextureImporterFormat.ARGB32) return Name + ".png";
			else return Name + ".jpg"; 
		}
	}
	
	public bool IsImage 
	{
		get { return t is Texture2D; }
	}
	
	private byte[] getBytes(float quality)
	{
		if(Format == TextureImporterFormat.ARGB32) {
			return t2d.EncodeToPNG (); 
		} else {
			JPGEncoder j = new JPGEncoder(t2d, quality);
			return j.GetBytes();
		}
	}
	
	public void Save(string path, float jpegQuality) {
		if (IsImage) {
			if (Format != TextureImporterFormat.ARGB32 && Format != TextureImporterFormat.RGB24) {
				Report.error ("Texture not exported. '" + Name + "' has wrong format: " + Format.ToString () + ", should be ARGB32 or RGB24");
			} else if (!asset.isReadable) {
				Report.error ("Texture not exported. '" + Name + "' not marked as readable.");
			} else {
				File.WriteAllBytes (path + FileName, getBytes(jpegQuality));
				Report.log ("Exporting texture " + Name + " to " + path + FileName);
			}
		}
	}
}

