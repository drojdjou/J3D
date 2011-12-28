using UnityEngine;

public class MaterialMapper
{
	public static string GetJ3DRenderer (Material m, Transform t)
	{
		int i = t.gameObject.renderer.lightmapIndex;
		if (t.gameObject.isStatic && i < 255 && i > -1)
			return "Lightmap";
		
		if(m.shader.name.IndexOf("Self-Illumin") > -1) return "Selflit";

		if(m.shader.name == "VertexLit") return "Gouraud";
		
		return "Phong";
	}
	
	public static string GetJ3DTextureName (string t)
	{
		switch (t) {
		case "_MainTex":
			return "colorTexture";
		default:
			return "colorTexture";
		}
	}
}

