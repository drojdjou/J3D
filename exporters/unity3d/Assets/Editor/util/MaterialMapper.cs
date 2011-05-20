using UnityEngine;

public class MaterialMapper
{
	public static string GetJ3DRenderer (Material m)
	{
		switch (m.shader.name) {
		case "VertexLit":
			return "Gouraud";
		default:
			return "Phong";
		}
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

