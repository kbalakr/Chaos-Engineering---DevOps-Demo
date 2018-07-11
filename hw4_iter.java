package devops_hw4;
import java.io.*;
import java.net.*;


public class hw4_iter {
	public static String getoutput(String route) throws Exception {
	      URL url = new URL(route);
	      HttpURLConnection conn = (HttpURLConnection) url.openConnection();
	      conn.setInstanceFollowRedirects(false);
	      conn.setRequestMethod("GET");
	      BufferedReader rd = new BufferedReader(new InputStreamReader(conn.getInputStream()));
	      String output=null; 
	      output=rd.readLine();
	      rd.close();	      
	      return output;
	   }
	public static void main(String[] args) throws Exception
	   {
		int iter = 100;
		float apiexp = 0;
		float api = 0;
		float apicontrol = 0;
		String redirect_url=null;
		for (int i=0;i<iter;i++) {
	    redirect_url = getoutput("http://localhost:3000/gateway");
	    //System.out.println(redirect_url);
		if(redirect_url.contains("apiexp"))
			apiexp++;
		else if(redirect_url.contains("apicontrol"))
			apicontrol++;
		else
			api++;
		}
		System.out.println("Redirect %");
		System.out.println("Route through api in % : " + (api/iter)*100);
		System.out.println("Route through apicontrol in % : " + (apicontrol/iter)*100);
		System.out.println("Route through apiexp in % : " + (apiexp/iter)*100);
	   }	
}
