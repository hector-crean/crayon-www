Create a template for R42 projects, which are text heavy


- FIGMA_URL: download and store figma frames in asset folder as svgs. Rather than use Amazon S3, we
perhaps use figma for all our asset storage, with these assets being incrementally copied to the asset folder
on command from our cli. The client should additionally add typed metadata to these assets, such as the name of the asset, its
figma page name, its figma id, and any other relevant information.


- Have a `References` database, which stores a uuid, and associated reference data. We may need a form component for this on the site itself (i.e. have an editor page), so that users can quickly add references. 
- We want the ability for the site to be statically generated
- It would be ideal for comments to be made on the site itself. Use liveblocks for threads etc.
- Screenshotting etc. How do we do this? Do we need to create a custom webscraper to intelligently take screenshots, or can we somehow embed data attributes into the html to give clearer instructions? But screenshots are simply not necessary if comments can literally be added to the site itself? Is there a way to get rid of liveblocks for a static site? Presumably we can just disabled it in `production` vs `development` ?




Modal editing?
Look at the blackbook text editor: see how command palette was implemented

rust```
trait CrayonEditor {
    fn undo() -> Result<(), String> {
        Err("Not implemented".to_string())
    }
    fn redo() -> Result<(), String> {
        Err("Not implemented".to_string())
    }   
}
```