using UnityEngine;
using UnityEditor;

public class Report
{
	
	private static Report _i;
	
	private ReportLevel _level;
	private bool _useConsole;
	
	private string _report;
	
	private Report ()
	{
		_level = ReportLevel.Warning;
		_useConsole = false;
		//_report = "";
	}
	
	private static void lazyCreate ()
	{
		if (_i == null)
			_i = new Report ();
	}
	
	public static ReportLevel level
	{
		get {
			lazyCreate ();
			return _i._level;
		}
		
		set {
			lazyCreate ();
			_i._level = value;
		}
	}
	
	public static bool useConsole {
		set {
			lazyCreate ();
			_i._useConsole = value;
		}
	}
	
	public static void log (string msg)
	{
		lazyCreate ();
		if (_i._level >= ReportLevel.All) {
			if (_i._useConsole)
				Debug.Log (msg);
			_i._report += msg + "\n";
		}
	}
	
	public static void warn (string msg)
	{
		lazyCreate ();
		if (_i._level >= ReportLevel.Warning) {
			if (_i._useConsole)
				Debug.LogError ("WARNING " + msg);
			_i._report += "WARNING " + msg + "\n";
		}
	}
		
	public static void error (string msg)
	{
		lazyCreate ();
		if (_i._level >= ReportLevel.Error) {
			if (_i._useConsole)
				Debug.LogError ("ERROR " + msg);
			_i._report += "ERROR " + msg + "\n";
		}
	}
	
	public static void saveReport (string path)
	{
		FileExport.SaveContentsAsFile (_i._report, path);
	}
}

public enum ReportLevel {
	Error, Warning, All
}
