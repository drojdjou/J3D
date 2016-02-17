using System.Collections;
using System.Collections.Generic;

using UnityEngine;
using UnityEditor;

public class AnimationExportData
{
	private Transform t;
	private RuntimeAnimatorController a;
	private AnimationClip defaultAnimation;
	private float samplingRate;
	private int numSamples;
	private Hashtable properties;

	public AnimationExportData (Transform transform, bool useQuaternion, float samplesPerSec)
	{
		t = transform;

		Animator ator = t.GetComponent<Animator>();

		a = ator.runtimeAnimatorController;

		samplingRate = 1.0f / samplesPerSec;

		defaultAnimation = a.animationClips[0];

		AnimationClipCurveData[] data = AnimationUtility.GetAllCurves (defaultAnimation, true);
		properties = new Hashtable();

		Debug.Log(data);

		/*

		foreach (AnimationClipCurveData d in data) {
			string un = d.propertyName;
			string jn = AnimationUtil.ExtractPropertyName (un);
			bool doExport = AnimationUtil.CheckForEulerHint (un);
			
			//Debug.Log ("Property: " + un + " as " + jn + " is exported " + doExport);
			
			AnimationProperty p = new AnimationProperty (jn);
			
			numSamples = 0;
			for (float i = 0; i <= defaultAnimation.length; i += samplingRate) {
				p.Samples.Add(d.curve.Evaluate(i));
				numSamples++;
			}
			
			if (doExport)
				properties.Add (jn, p);
		}
		
		for(int i = 0; i < numSamples; i++) {
			if(properties.ContainsKey("pz")) {
				float px = ( (AnimationProperty) properties["px"] ).Samples[i];	
				float py = ( (AnimationProperty) properties["py"] ).Samples[i];	
				float pz = ( (AnimationProperty) properties["pz"] ).Samples[i];	
				pz = -pz;
				( (AnimationProperty) properties["px"] ).SamplesEx.Add ( px.ToString (ExporterProps.LN) );
				( (AnimationProperty) properties["py"] ).SamplesEx.Add ( py.ToString (ExporterProps.LN) );
				( (AnimationProperty) properties["pz"] ).SamplesEx.Add ( pz.ToString (ExporterProps.LN) );
			}
			
			if(properties.ContainsKey("rx")) {
				Quaternion r = new Quaternion();
				r.x = ( (AnimationProperty) properties["rx"] ).Samples[i];	
				r.y = ( (AnimationProperty) properties["ry"] ).Samples[i];	
				r.z = -( (AnimationProperty) properties["rz"] ).Samples[i];
				r.w = ( (AnimationProperty) properties["rw"] ).Samples[i];
				
				r = Conversions.NormalizeQuaternion(r);

				if(!useQuaternion) { 
					Vector3 e = Conversions.SwitchRotation(r);
					( (AnimationProperty) properties["rx"] ).SamplesEx.Add ( e.x.ToString (ExporterProps.LN) );
					( (AnimationProperty) properties["ry"] ).SamplesEx.Add ( e.y.ToString (ExporterProps.LN) );
					( (AnimationProperty) properties["rz"] ).SamplesEx.Add ( e.z.ToString (ExporterProps.LN) );
				} else {	
					( (AnimationProperty) properties["rx"] ).SamplesEx.Add ( r.x.ToString (ExporterProps.LN) );
					( (AnimationProperty) properties["ry"] ).SamplesEx.Add ( r.y.ToString (ExporterProps.LN) );
					( (AnimationProperty) properties["rz"] ).SamplesEx.Add ( r.z.ToString (ExporterProps.LN) );
					( (AnimationProperty) properties["rw"] ).SamplesEx.Add ( r.w.ToString (ExporterProps.LN) );
				}
		*/
				
				/*
				Vector3 r = new Vector3();
				r.x = ( (AnimationProperty) properties["rx"] ).Samples[i];	
				r.y = ( (AnimationProperty) properties["ry"] ).Samples[i];	
				r.z = ( (AnimationProperty) properties["rz"] ).Samples[i];
								
				( (AnimationProperty) properties["rx"] ).SamplesEx.Add ( r.x.ToString (ExporterProps.LN) );
				( (AnimationProperty) properties["ry"] ).SamplesEx.Add ( r.y.ToString (ExporterProps.LN) );
				( (AnimationProperty) properties["rz"] ).SamplesEx.Add ( r.z.ToString (ExporterProps.LN) );
				*/
			// }
		//}
	}
	
	public string Name {
		get { return NamesUtil.CleanLc (defaultAnimation.name); }
	}
	
	public string Length {
		get { return defaultAnimation.length.ToString (ExporterProps.LN); }
	}
		
	public string Wrapmode {
		get { return defaultAnimation.wrapMode.ToString().ToLower(); }
	}
	
	public string SamplingRate {
		get { return samplingRate.ToString (ExporterProps.LN); }
	}
	
	public string NumSamples {
		get { return numSamples.ToString (ExporterProps.LN); }
	}
	
	public ICollection Properties {
		get { return properties.Values; }
	}
}

public struct AnimationProperty
{
	public string Name;
	public List<float> Samples;
	public List<string> SamplesEx;

	public AnimationProperty (string n)
	{
		Name = n;  
		Samples = new List<float> ();
		SamplesEx = new List<string> ();
	}
}


