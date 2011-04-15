using UnityEngine;
using System.Collections.Generic;

public class MeshExportData
{
	private Mesh m;

	public MeshExportData (Transform t)
	{
		this.m = t.gameObject.GetComponent<MeshFilter> ().sharedMesh;
	}

	public string Name {
		get { return NamesUtil.CleanLc (m.name); }
	}

	public string[] Vertices {
		get {
			List<string> vs = new List<string> ();
			foreach (Vector3 v in m.vertices) {
				vs.Add ((v.x).ToString(ExporterProps.LN));
				vs.Add (v.y.ToString (ExporterProps.LN));
				vs.Add ((-v.z).ToString (ExporterProps.LN));
			}
			return vs.ToArray ();
		}
	}

	public string[] Normals {
		get {
			List<string> vs = new List<string> ();
			foreach (Vector3 v in m.normals) {
				vs.Add ((-v.x).ToString (ExporterProps.SN));
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


