using UnityEngine;
using System.Collections.Generic;

public class MaterialExportData
{
	private Material m;
	private Transform t;
	private List<string> textures;

	public MaterialExportData (Transform t, List<string> textures)
	{
		this.t = t;
		m = t.gameObject.renderer.sharedMaterial;
		this.textures = textures;
	}

	public string Name {
		get { return NamesUtil.CleanMat (m.name); }
	}
	
	public string Type {
		get { return MaterialMapper.GetJ3DRenderer (m, t); }
	}
	
	public Color Color {
		get { return m.color; }
	}
	
	public string[] TextureScale {
		get {
			Vector2 p = m.GetTextureScale (this.textures[0]);
			return new string[] { (p.x).ToString (ExporterProps.LN), (p.y).ToString (ExporterProps.LN) };
		}
	}
	
	public string[] TextureOffset {
		get {
			Vector2 p = m.GetTextureOffset (this.textures[0]);
			return new string[] { (p.x).ToString (ExporterProps.LN), (p.y).ToString (ExporterProps.LN) };
		}
	}
	
	public string[] Textures {
		get {
			List<string> tjs = new List<string> ();
			
			foreach (string tn in textures) {
				tjs.Add (
					"\"" + MaterialMapper.GetJ3DTextureName (tn) + "\": " + 
					"\"" + NamesUtil.CleanLc (m.GetTexture ("_MainTex").name) + "\""
				);
			}
			
			return tjs.ToArray ();
		}
	}
	
	public string Shininess {
		get {
			return (m.HasProperty ("_Shininess")) ? (m.GetFloat ("_Shininess")).ToString (ExporterProps.LN) : "0";
		}
	}
	
	public string SpecularIntensity {
		get {
			if (!m.HasProperty ("_SpecColor")) {
				return "0";
			} else {
				Color sc = m.GetColor ("_SpecColor");
				return (sc.r * sc.g * sc.b).ToString (ExporterProps.LN);
			}
		}
	}
}


