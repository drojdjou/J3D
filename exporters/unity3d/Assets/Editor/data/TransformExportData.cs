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

	public string LightName {
		get { return NamesUtil.CleanLc (t.gameObject.light.name); }
	}

	public string CameraName {
		get { return NamesUtil.CleanLc (t.gameObject.camera.name); }
	}

	public bool HasRenderer {
		get { return t.gameObject.renderer != null; }
	}

	public bool HasLight {
		get { return t.gameObject.light != null; }
	}

	public bool HasCamera {
		get { return t.gameObject.camera != null; }
	}

	public string[] Position {
		get {
			Vector3 p = t.localPosition;
			return new string[] { (p.x).ToString (ExporterProps.LN), (p.y).ToString (ExporterProps.LN), (-p.z).ToString (ExporterProps.LN) };
		}
	}
	
	public string[] Rotation {
		get {
			return RotationSwitched;
		}
	}
	
	public string[] RotationRaw {
		get {
			Vector3 r = t.rotation.eulerAngles;
			return new string[] { (r.x).ToString (ExporterProps.LN), (r.y).ToString (ExporterProps.LN), (r.z).ToString (ExporterProps.LN) }; 
		}
	}

	public string[] RotationSwitched {
		get {
			
			Matrix4x4 rm = Matrix4x4.TRS (Vector3.zero, t.localRotation, Vector3.one);
			
			rm[0, 2] = -rm[0, 2];
			rm[1, 2] = -rm[1, 2];
			rm[2, 0] = -rm[2, 0];
			rm[2, 1] = -rm[2, 1];
			
			float thetaX, thetaY, thetaZ;
			
			
			if (rm[2, 1] < +1) {
				if (rm[2, 1] > -1) {
					thetaX = Mathf.Asin (rm[2, 1]);
					thetaZ = Mathf.Atan2 (-rm[0, 1], rm[1, 1]);
					thetaY = Mathf.Atan2 (-rm[2, 0], rm[2, 2]);
				} else {
					// r21 = -1 
					thetaX = -Mathf.PI / 2.0f;
					thetaZ = -Mathf.Atan2 (rm[0, 2], rm[0, 0]);
					thetaY = 0;
				}
			} else {
				// r21 = +1
				thetaX = Mathf.PI / 2.0f;
				thetaZ = Mathf.Atan2 (rm[0, 2], rm[0, 0]);
				thetaY = 0;
			}
			
			//Debug.Log (t.name + ": " + t.rotation.eulerAngles + " > " + (thetaX * Mathf.Rad2Deg) + ", " + (thetaY * Mathf.Rad2Deg) + ", " + (thetaZ * Mathf.Rad2Deg));
			
			return new string[] { 
				thetaX.ToString (ExporterProps.LN),
				thetaY.ToString (ExporterProps.LN), 
				thetaZ.ToString (ExporterProps.LN) 
			};
		}
	}

	public string SetupChildren {
		get {
			string r = "";
			
			for (int i = 0; i < t.childCount; i++) {
				r += Name + ".add(" + NamesUtil.CleanLc (t.GetChild (i).name) + ");\n";
			}
			
			return r;
		}
	}
}


