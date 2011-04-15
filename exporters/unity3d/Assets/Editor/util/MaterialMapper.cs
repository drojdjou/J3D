using UnityEngine;

public class MaterialMapper
{
	public static string GetJ3DRenderer (Material m)
	{
		switch (m.shader.name) {
		case "VertexLit":
			return "J3D.Gouraud";
		default:
			return "J3D.Phong";
		}
	}
}

