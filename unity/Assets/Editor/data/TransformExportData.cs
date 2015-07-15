using UnityEngine;
using System.Collections.Generic;

public class TransformExportData
{
	private Transform t;
	private TransformExportData p;
	private ColliderExportData c;
	//private int uid;
	private bool useQuaternion;
	
	//public static int uidc;


	public TransformExportData (Transform t, TransformExportData p, bool useQuaternion)
	{
		//uid = uidc++;
		this.t = t;
		this.p = p;
		this.useQuaternion = useQuaternion;
		this.c = new ColliderExportData(t);
	}
	
	public string UID {
		get { return "t" + t.GetInstanceID(); }
	}

	public string Name {
		get { return NamesUtil.CleanLc (t.name); }
	}

	public string Parent {
		get { return p.UID; }
	}

	public bool HasParent {
		get { return p != null; }
	}

	public string MeshName {
		get { 
			string m;

			if(this.HasBones) m = t.gameObject.GetComponent<SkinnedMeshRenderer>().sharedMesh.name;
			else m = t.gameObject.GetComponent<MeshFilter>().sharedMesh.name;

			return NamesUtil.CleanLc (m); 
		}
	}

	public string MeshId {
		get { 
			int m;

			if(this.HasBones) m = t.gameObject.GetComponent<SkinnedMeshRenderer>().sharedMesh.GetInstanceID();
			else m = t.gameObject.GetComponent<MeshFilter>().sharedMesh.GetInstanceID();

			return "m-" + m; 
		}
	}

	public string MaterialName {
		get { return NamesUtil.CleanMat (t.gameObject.GetComponent<Renderer>().sharedMaterial.name); }
	}
	
	public bool HasLightmap {
		get { return t.gameObject.GetComponent<Renderer>().lightmapIndex != 255 && t.gameObject.GetComponent<Renderer>().lightmapIndex != -1; }
	}
	
	public int LightmapIndex {
		get { return t.gameObject.GetComponent<Renderer>().lightmapIndex; }
	}
	
	public string[] LightmapTileOffset {
		get {
			Vector4 p = t.gameObject.GetComponent<Renderer>().lightmapScaleOffset;
			return new string[] { 
				p.x.ToString (ExporterProps.LN), 
				p.y.ToString (ExporterProps.LN), 
				p.z.ToString (ExporterProps.LN),
				p.w.ToString (ExporterProps.LN)
			};
		
		}
	}

	public string LightName {
		get { return NamesUtil.CleanLc (t.gameObject.GetComponent<Light>().name); }
	}

	public string CameraName {
		get { return NamesUtil.CleanLc (t.gameObject.GetComponent<Camera>().name); }
	}
	
	public string AnimationName {
		get { return NamesUtil.CleanLc (t.GetComponent<Animation>().clip.name); }
	}

	public bool HasRenderer {
		get { return t.gameObject.GetComponent<Renderer>() != null; }
	}

	public bool HasLight {
		get { return t.gameObject.GetComponent<Light>() != null; }
	}

	public bool HasCamera {
		get { return t.gameObject.GetComponent<Camera>() != null; }
	}
	
	public bool HasAnimation {
		get { return t.GetComponent<Animation>() != null; }
	}
	
	public bool HasCollider {
		get { return c != null && c.Type != ""; }
	}
	
	public ColliderExportData Collider {
		get { return c; }
	}

	public string[] Position {
		get {
			Vector3 p = t.localPosition;
			return new string[] { (p.x).ToString (ExporterProps.LN), (p.y).ToString (ExporterProps.LN), (-p.z).ToString (ExporterProps.LN) };
		}
	}
	
	public bool HasScale {
		get {
			Vector3 s = t.localScale;
			bool hs = s.x == 1.0f && s.y == 1.0f && s.z == 1.0f;
			//if(!hs) Debug.Log(t.name + " has scale " + t.localScale.ToString());
			return !hs;
		}
	}
	
	public string[] Scale {
		get {
			Vector3 s = t.localScale;
			return new string[] { (s.x).ToString (ExporterProps.LN), (s.y).ToString (ExporterProps.LN), (s.z).ToString (ExporterProps.LN) };
		}
	}
	
	public string[] Rotation {
		get {
			if(useQuaternion) {

				Quaternion r = t.localRotation;

				float angle = 0.0F;
     			Vector3 axis = Vector3.zero;
     			r.ToAngleAxis(out angle, out axis);
     			//Debug.Log(axis);
     			axis.x *= -1;
     			axis.y *= -1;
     			r = Quaternion.AngleAxis(angle, axis);

				return new string[] { (r.x).ToString (ExporterProps.LN), (r.y).ToString (ExporterProps.LN), (r.z).ToString (ExporterProps.LN), (r.w).ToString (ExporterProps.LN) };	
			} else {
				Vector3 r = Conversions.SwitchRotation(t.localRotation);
				return new string[] { (r.x).ToString (ExporterProps.LN), (r.y).ToString (ExporterProps.LN), (r.z).ToString (ExporterProps.LN) };
			}
		}
	}
	
	/** Deprecated
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
	**/

	public string SetupChildren {
		get {
			string r = "";
			
			for (int i = 0; i < t.childCount; i++) {
				r += Name + ".add(" + NamesUtil.CleanLc (t.GetChild (i).name) + ");\n";
			}
			
			return r;
		}
	}

	
	public bool HasBones {
		get {
			return t.gameObject.GetComponent<SkinnedMeshRenderer> () != null;
		}
	}

	public string RootBone {
		get {
			SkinnedMeshRenderer r = t.gameObject.GetComponent<SkinnedMeshRenderer> ();
			Transform b = r.bones[0];
			return "t" + b.GetInstanceID();
		}
	}

	public string[] Bones {
		get {
			List<string> vs = new List<string> ();

			SkinnedMeshRenderer r = t.gameObject.GetComponent<SkinnedMeshRenderer> ();

			foreach (Transform tc in r.bones) {
				vs.Add("t" + tc.GetInstanceID());
			}

			return vs.ToArray();
		}
	}

	public string[] BindPoses {
		get {
			List<string> vs = new List<string>();
			Mesh m = t.gameObject.GetComponent<SkinnedMeshRenderer>().sharedMesh;

			foreach (Matrix4x4 mx in m.bindposes) {
				Quaternion r = Quaternion.LookRotation(mx.GetColumn(2), mx.GetColumn(1));
				string[] ra = new string[] { (r.x).ToString (ExporterProps.LN), (r.y).ToString (ExporterProps.LN), (r.z).ToString (ExporterProps.LN), (r.w).ToString (ExporterProps.LN) };
				vs.Add("[" + string.Join(",", ra) + "]");
			}

			return vs.ToArray();
		}
	}
}



















