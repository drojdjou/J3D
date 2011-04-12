using UnityEngine;

public class MaterialExportData
{
	private Material m;

	public MaterialExportData (Transform t)
	{
		m = t.gameObject.renderer.sharedMaterial;
	}

	public string Name {
		get { return NamesUtil.CleanMat (m.name); }
	}
	
	public string Type {
		get { return MaterialMapper.GetJ3DRenderer (m); }
	}
	
	public Color Color {
		get { return m.color; }
	}
	
	public string SpecularIntensity {
		get {
			return (m.HasProperty("_Shininess")) ? (m.GetFloat ("_Shininess")*128).ToString (ExporterProps.LN) : "0";
		}
	}
}


