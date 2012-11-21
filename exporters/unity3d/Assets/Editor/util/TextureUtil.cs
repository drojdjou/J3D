using System;
using UnityEngine;
using System.Collections.Generic;

public class TextureUtil
{
	public static List<string> ExtractTexturesNames (Material m)
	{
		List<string> texnames = new List<string> ();
		
		// TODO: Is there a way to extract texture names from a shader?
		CheckTexture ("_MainTex", m, texnames);
		CheckTexture ("_BumpMap", m, texnames);
		
		return texnames;
	}
	
	public static void CheckTexture (string n, Material m, List<string> l)
	{
		// Debug.Log( "Has property " + n + " " + m.HasProperty (n) );
		// Debug.Log( "Get texture  " + n + " " + m.GetTexture(n) );
		if (m.HasProperty (n) && m.GetTexture(n) != null) {
			l.Add (n);
		}
	}
}

