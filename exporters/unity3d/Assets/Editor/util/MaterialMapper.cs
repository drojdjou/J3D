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
}

