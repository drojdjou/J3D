using UnityEngine;
using System.Collections.Generic;

public class MeshExportData
{
	private Mesh m;

	public MeshExportData (Transform t)
	{
		if(t.GetComponent<Renderer>() is MeshRenderer) {
			MeshFilter mesh = t.gameObject.GetComponent<MeshFilter> ();
			this.m = mesh.sharedMesh;
		} else {
			this.m = t.gameObject.GetComponent<SkinnedMeshRenderer> ().sharedMesh;
		}
	}

	public string Name {
		get { return NamesUtil.CleanLc (m.name); }
	}

	public string Id {
		get { return "m-" + m.GetInstanceID(); }
	}

	public string[] Vertices {
		get {
			List<string> vs = new List<string> ();
			foreach (Vector3 v in m.vertices) {
				vs.Add (( v.x).ToString(ExporterProps.LN));
				vs.Add (( v.y).ToString (ExporterProps.LN));
				vs.Add ((-v.z).ToString (ExporterProps.LN));
			}
			return vs.ToArray ();
		}
	}

	public string[] Normals {
		get {
			List<string> vs = new List<string> ();
			foreach (Vector3 v in m.normals) {
				vs.Add (( v.x).ToString (ExporterProps.SN));
				vs.Add (( v.y).ToString (ExporterProps.SN));
				vs.Add ((-v.z).ToString (ExporterProps.SN));
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
	
	public string[] Tangents {
		get {
			List<string> vs = new List<string> ();
			foreach (Vector4 v in m.tangents) {
				vs.Add (v.x.ToString (ExporterProps.SN));
				vs.Add (v.y.ToString (ExporterProps.SN));
				
				// WARNING! Changed this to -v.z without testing)
				// vs.Add (v.z.ToString (ExporterProps.SN));
				vs.Add ((-v.z).ToString (ExporterProps.SN));
				
				vs.Add (v.w.ToString (ExporterProps.SN));
			}
			return vs.ToArray ();
		}
	}

	public bool IsSkinned {
		get {
			return m.boneWeights.Length > 0;
		}
	}

	public string[] BoneWeights {
		get {
			List<string> vs = new List<string> ();

			foreach (BoneWeight v in m.boneWeights) {
				vs.Add (v.weight0.ToString (ExporterProps.SN));
				vs.Add (v.weight1.ToString (ExporterProps.SN));
				vs.Add (v.weight2.ToString (ExporterProps.SN));
				vs.Add (v.weight3.ToString (ExporterProps.SN));
			}

			return vs.ToArray ();
		}
	}

	public string[] BoneIndices {
		get {
			List<string> vs = new List<string> ();

			foreach (BoneWeight v in m.boneWeights) {
				vs.Add (v.boneIndex0.ToString ());
				vs.Add (v.boneIndex1.ToString ());
				vs.Add (v.boneIndex2.ToString ());
				vs.Add (v.boneIndex3.ToString ());
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


