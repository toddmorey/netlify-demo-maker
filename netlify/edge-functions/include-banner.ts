import { Context } from "https://edge.netlify.com";

export default async (request: Request, context: Context) => {
  
  // Just return what was requested without transforming it, 
  // unless we fnd "nobanner" query parameter
  const url = new URL(request.url);
  if (url.searchParams.get("include") !== "nobanner") {
    return;
  }

  console.log("Including banner using Netlify Edge");
  
  // Get the page content
  const response = await context.next();
  const page = await response.text();

  // Search for the placeholder
  const regex = /<\/html>/i;

  // Replace the content
  const bannerContent = "<div class='banner-here'>I just added a banner!</div>";
  const updatedPage = page.replace(regex, bannerContent);
  return new Response(updatedPage, response);
};