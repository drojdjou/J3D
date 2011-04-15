using UnityEngine;

public class LightExportData
{
	private Light lg;
	private Transform t;
	
	public LightExportData (Transform t)
	{
		this.t = t;
		this.lg = t.gameObject.light;
	}
	
	public string Name {
		get { return NamesUtil.CleanLc (t.name); }
	}
	
	public string Type {
		get {
			if (lg.type == LightType.Directional)
				return "J3D.DIRECT";
			else
				return "J3D.POINT";
			// Spot light not supported yet, exported as point
		
		}
	}
	
	public bool IsDirectional {
		get { return lg.type == LightType.Directional; }
	}
	
	public Color Color {
		get { return lg.color; }
	}
	
	public string[] Direction {
		get {
			Vector3 p = t.TransformDirection (t.forward);
			return new string[] { p.x.ToString (ExporterProps.LN), p.y.ToString (ExporterProps.LN), p.z.ToString (ExporterProps.LN) };
		}
	}
}


