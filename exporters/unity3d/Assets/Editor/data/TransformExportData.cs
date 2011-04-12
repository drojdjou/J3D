using UnityEngine;

public class TransformExportData
{
	private Transform t;

	public TransformExportData (Transform t)
	{
		this.t = t;
	}

	public string Name {
		get { return NamesUtil.CleanLc (t.name); }
	}
	
	public string Parent {
		get { return NamesUtil.CleanLc (t.parent.name); }
	}
	
	public bool HasParent {
		get { return t.parent != null; }
	}
	
	public string MeshName {
		get { return NamesUtil.CleanLc (t.gameObject.GetComponent<MeshFilter> ().sharedMesh.name); }
	}
	
	public string MaterialName {
		get { return NamesUtil.CleanMat (t.gameObject.renderer.sharedMaterial.name); }
	}
	
	public bool HasRenderer {
		get { return t.gameObject.renderer != null; }
	}
	
	public string[] Position {
		get {
			Vector3 p = t.position;
			return new string[] { p.x.ToString (ExporterProps.LN), p.y.ToString (ExporterProps.LN), p.z.ToString (ExporterProps.LN) };
		}
	}
	
	public string[] Rotation {
		get {
			Vector3 p = t.rotation.eulerAngles;
			return new string[] { 
				(Mathf.Deg2Rad * p.x).ToString (ExporterProps.LN), 
				(Mathf.Deg2Rad * p.y).ToString (ExporterProps.LN), 
				(Mathf.Deg2Rad * p.z).ToString (ExporterProps.LN) 
			};
		}
	}
	
	public string SetupChildren {
		get {
			string r = "";
			
			for (int i = 0; i < t.childCount; i++) {
				r += Name + ".add(" + NamesUtil.CleanLc (t.GetChild(i).name) + ");\n";
			}
			
			return r;
		}
	}
}


