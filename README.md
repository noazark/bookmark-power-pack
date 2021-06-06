# Bookmark Power Pack

Access your bookmarks like you've never been able to before.


### Hiding the horizontal tabs

```css
#main-window[tabsintitlebar="true"]:not([extradragspace="true"]) #TabsToolbar > .toolbar-items {
  opacity: 0;
  pointer-events: none;
}

#sidebar-box[sidebarcommand="treestyletab_piro_sakura_ne_jp-sidebar-action"] #sidebar-header {
  display: none;
}

/* Move navbar elements to the side to make room for window buttons */
#nav-bar {
  padding-left: 140px;
}

#titlebar {
  appearance: none !important;
  height: 0px;
}

#titlebar > #toolbar-menubar {
  margin-top: 0px;
}

#TabsToolbar {
  min-width: 0 !important;
  min-height: 0 !important;
}

#TabsToolbar > .titlebar-buttonbox-container {
  display: block;
  position: absolute;
  top: 12px;
  left: 0px;
}
```