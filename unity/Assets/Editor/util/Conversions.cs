using UnityEngine;

public class Conversions
{
	public static Vector3 SwitchRotation (Quaternion r)
	{
		Debug.Log ("CNV " + r.x + ", " + r.y+ ", " + r.z + ", " + r.w);	
		
		Matrix4x4 rm = Matrix4x4.TRS (Vector3.zero, r, Vector3.one);
			
		rm [0, 2] = -rm [0, 2];
		rm [1, 2] = -rm [1, 2];
		rm [2, 0] = -rm [2, 0];
		rm [2, 1] = -rm [2, 1];
			
		float thetaX, thetaY, thetaZ;
			
			
		if (rm [2, 1] < +1) {
			if (rm [2, 1] > -1) {
				thetaX = Mathf.Asin (rm [2, 1]);
				thetaZ = Mathf.Atan2 (-rm [0, 1], rm [1, 1]);
				thetaY = Mathf.Atan2 (-rm [2, 0], rm [2, 2]);
			} else {
				// r21 = -1 
				thetaX = -Mathf.PI / 2.0f;
				thetaZ = -Mathf.Atan2 (rm [0, 2], rm [0, 0]);
				thetaY = 0;
			}
		} else {
			// r21 = +1
			thetaX = Mathf.PI / 2.0f;
			thetaZ = Mathf.Atan2 (rm [0, 2], rm [0, 0]);
			thetaY = 0;
		}
			
		return new Vector3 (thetaX, thetaY, thetaZ);
	}
	
	public static Quaternion NormalizeQuaternion(Quaternion r) {

        float len = Mathf.Sqrt(r.x * r.x + r.y * r.y + r.z * r.z + r.w * r.w);
		
        if (len != 0) {
	        len = 1.0f / len;
	        r.x *= len;
	        r.y *= len;
	        r.z *= len;
	        r.w *= len;
		}
		
		return r;
	}
}


