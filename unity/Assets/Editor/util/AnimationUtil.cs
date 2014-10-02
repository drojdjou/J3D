using System;
using UnityEngine;
using System.Collections.Generic;

public class AnimationUtil
{
	public static string ExtractPropertyName (string un)
	{
		switch (un) {
		case "m_LocalPosition.x":
			return "px";
		case "m_LocalPosition.y":
			return "py";
		case "m_LocalPosition.z":
			return "pz";
			
		case "m_LocalEulerAnglesHint.x":
			return "rx";
		case "m_LocalEulerAnglesHint.y":
			return "ry";
		case "m_LocalEulerAnglesHint.z":
			return "rz";
			
		case "m_LocalRotation.x":
			return "rx";
		case "m_LocalRotation.y":
			return "ry";
		case "m_LocalRotation.z":
			return "rz";
		case "m_LocalRotation.w":
			return "rw";
			
		default:
			return un;
		}
	}
	
	public static bool CheckForEulerHint(string un) {
		return un.IndexOf("m_LocalEulerAnglesHint") == -1;
	}
	
	public static Vector3 adaptPosition(Vector3 p) {
		p.z = -p.z;
		return p;
	}
}

