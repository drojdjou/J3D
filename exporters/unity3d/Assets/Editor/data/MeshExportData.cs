using UnityEngine;
using System.Collections.Generic;

public class MeshExportData
{
	private GameObject g;
	private Mesh m;

	public MeshExportData (GameObject g)
	{
		this.g = g;
		this.m = g.GetComponent<MeshFilter> ().sharedMesh;
	}

	public string Name {
		get { return NamesUtil.Clean (g.name); }
	}

	public string FileName {
		get { return NamesUtil.CleanLc (g.name) + ".js"; }
	}

	public string[] Vertices {
		get {
			List<string> vs = new List<string> ();
			foreach (Vector3 v in m.vertices) {
				vs.Add (v.x.ToString(ExporterProps.LN));
				vs.Add (v.y.ToString (ExporterProps.LN));
				vs.Add (v.z.ToString (ExporterProps.LN));
			}
			return vs.ToArray ();
		}
	}

	public string[] Normals {
		get {
			List<string> vs = new List<string> ();
			foreach (Vector3 v in m.normals) {
				vs.Add (v.x.ToString (ExporterProps.SN));
				vs.Add (v.y.ToString (ExporterProps.SN));
				vs.Add (v.z.ToString (ExporterProps.SN));
			}
			return vs.ToArray ();
		}
	}

	public int[] Triangles {
		get { return m.triangles; }
	}

	public string[] UV1 {
		get {
			float uvs = 0;
			List<string> vs = new List<string> ();
			foreach (Vector3 v in m.uv) {
				vs.Add (v.x.ToString (ExporterProps.SN));
				vs.Add (v.y.ToString (ExporterProps.SN));
				uvs += v.x + v.y;
			}
			if(uvs == 0) return new string[0];
			else return vs.ToArray ();
		}
	}

	public string[] UV2 {
		get {
			List<string> vs = new List<string> ();
			foreach (Vector3 v in m.uv2) {
				vs.Add (v.x.ToString (ExporterProps.SN));
				vs.Add (v.y.ToString (ExporterProps.SN));
			}
			return vs.ToArray ();
		}
	}

	public int NumFaces {
		get { return m.triangles.Length / 3; }
	}

	public int NumVertices {
		get { return m.vertexCount; }
	}
}


