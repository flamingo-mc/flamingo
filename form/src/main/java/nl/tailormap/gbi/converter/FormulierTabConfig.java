package nl.tailormap.gbi.converter;

import java.util.HashMap;
import java.util.Map;

public class FormulierTabConfig {

    private Map<String, String> tabs = new HashMap<>();

    public Map<String, String> getTabs() {
        return tabs;
    }

    public void setTabs(Map<String, String> tabs) {
        this.tabs = tabs;
    }
}
