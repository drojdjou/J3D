using UnityEngine;
using System;

public class ColliderExportData
{
	private Transform t;
	private Collider c; 
	
	public ColliderExportData (Transform t) {
		this.t = t;
		if(t.collider != null) {
			this.c = t.collider;
		}
	}
	
	public string Type {
		get {
			if(c == null) return "";
			
			if(c is BoxCollider) {
				return "box";
			} else if(c is SphereCollider) {
				return "sphere";
			} else if(c is MeshCollider) {
				return "mesh";
			} else {
				Debug.LogWarning("Unsupported collider on " + t.name + ": " + c);
				return "";
			}
		}
	}
	
	
	public bool HasCenter {
		get { return c is BoxCollider || c is SphereCollider; }
	}
	
	public bool HasSize {
		get { return c is BoxCollider; }
	}
	
	public bool HasRadius {
		get { return c is SphereCollider; }
	}
	
	public bool HasMesh {
		get { return c is MeshCollider; }
	}
	
	
	public string[] Center {
		get { 
			Vector3 v = (Type == "box") ? (c as BoxCollider).center : (c as SphereCollider).center;
			return new string[] { (v.x).ToString (ExporterProps.LN), (v.y).ToString (ExporterProps.LN), (v.z).ToString (ExporterProps.LN) };
		}
	}
	
	public string[] Size {
		get { 
			Vector3 v = (c as BoxCollider).size;
			return new string[] { (v.x).ToString (ExporterProps.LN), (v.y).ToString (ExporterProps.LN), (v.z).ToString (ExporterProps.LN) };
		}
	}
	
	public string Radius {			
		get { 
			float v = (c as SphereCollider).radius;
			return (v).ToString (ExporterProps.LN); 
		}
	}
	
	public string MeshName {
		get { 
			Mesh v = (c as MeshCollider).sharedMesh;
			return NamesUtil.CleanLc (v.name); 
		}
	}
}	

