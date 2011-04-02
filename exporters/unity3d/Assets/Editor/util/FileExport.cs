using System;
using System.IO;
using System.Text;

using Antlr.StringTemplate;
using Antlr.StringTemplate.Language;

using UnityEngine;

public class FileExport
{
	public static string templatePath = Application.dataPath + "/Editor/templates/";
	
	public static StringTemplate LoadTemplate (string name)
	{
		StringTemplateGroup templateGroup = new StringTemplateGroup ("MG", templatePath, typeof(DefaultTemplateLexer));
		return templateGroup.GetInstanceOf (name);
	}

	public static void SaveContentsAsFile (string content, string fileName, string path)
	{
		Byte[] info = new UTF8Encoding (true).GetBytes (content);
		FileStream fs = File.Create (path + fileName);
		fs.Write (info, 0, info.Length);
		fs.Close ();
	}
	
	public static void FileCopy (string asset, string toFolder)
	{
		string target = toFolder + asset.Substring (asset.LastIndexOf ("/") + 1);
		File.Delete(target);
		File.Copy (asset, target);
	}
}


