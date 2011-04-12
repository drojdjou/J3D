public class NamesUtil
{
	public static string Clean (string n)
	{
		return n.Replace (" ", "_").Replace (".", "_").Replace (":", "_").Replace ("-", "_").Replace ("+", "_");
	}
	
	public static string CleanLc (string n)
	{
		return Clean (n).ToLower ();
	}
	
	public static string CleanMat (string n)
	{
		return CleanLc (n).Replace (" (Instance)", "");
	}
}


