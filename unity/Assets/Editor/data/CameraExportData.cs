using UnityEngine;

public class CameraExportData
{
	private Camera c;
	
	public CameraExportData (Transform t)
	{
		c = t.GetComponent<Camera>();
	}
	
	public string Name {
		get { return NamesUtil.CleanLc (c.name); }
	}
	
	public float FOV {
		get { return c.fieldOfView; }
	}
	
	public float Near {
		get { return c.nearClipPlane; }
	}
		
	public float Far {
		get { return c.farClipPlane; }
	}
}


