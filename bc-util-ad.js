/**
 * Brightcove JavaScript Utilities External Ad Layer 2.0.0 (12 OCTOBER 2010)
 * (Formerly known as External_Ad)
 *
 * REFERENCES:
 *	 Website: http://opensource.brightcove.com
 *	 Source: http://github.com/brightcoveos
 *
 * AUTHORS:
 *	 Jesse Streb <jstreb@brightcove.com>
 *	 Brandon Aaskov <baaskov@brightcove.com>
 *
 * Permission is hereby granted, free of charge, to any person obtaining a
 * copy of this software and associated documentation files (the “Software”),
 * to deal in the Software without restriction, including without limitation
 * the rights to use, copy, modify, alter, merge, publish, distribute,
 * sublicense, and/or sell copies of the Software, and to permit persons to
 * whom the Software is furnished to do so, subject to the following conditions:
 *   
 * 1. The permission granted herein does not extend to commercial use of
 * the Software by entities primarily engaged in providing online video and
 * related services.
 *  
 * 2. THE SOFTWARE IS PROVIDED "AS IS", WITHOUT ANY WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
 * MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, SUITABILITY, TITLE,
 * NONINFRINGEMENT, OR THAT THE SOFTWARE WILL BE ERROR FREE. IN NO EVENT
 * SHALL THE AUTHORS, CONTRIBUTORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
 * CLAIM, DAMAGES OR OTHER LIABILITY WHATSOEVER, WHETHER IN AN ACTION OF
 * CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH
 * THE SOFTWARE OR THE USE, INABILITY TO USE, OR OTHER DEALINGS IN THE SOFTWARE.
 *  
 * 3. NONE OF THE AUTHORS, CONTRIBUTORS, NOR BRIGHTCOVE SHALL BE RESPONSIBLE
 * IN ANY MANNER FOR USE OF THE SOFTWARE.  THE SOFTWARE IS PROVIDED FOR YOUR
 * CONVENIENCE AND ANY USE IS SOLELY AT YOUR OWN RISK.  NO MAINTENANCE AND/OR
 * SUPPORT OF ANY KIND IS PROVIDED FOR THE SOFTWARE.
 */

var BCUtil_Ad=function(pXML){var xml="";var expandedBannerURL="";var expandedBannerClickURL="";var collapsedBannerURL="";var collapsedBannerClickURL="";var ad={};ad.type="videoAd";if(pXML===undefined){throw new Error('An External Ad requires the ad XML and type of ad to return');} function getXML(){var adXML;if(window.ActiveXObject){adXML=new ActiveXObject("Microsoft.XMLDOM");adXML.async=false;adXML.loadXML(xml);}else if(window.XMLHttpRequest){adXML=(new DOMParser()).parseFromString(xml,"text/xml");} return adXML;} function createSWF(pURL,pClickThrough){var objectTag='<object classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" codebase="http://fpdownload.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=8,0,0,0" width="300" height="250" align="middle">\n';objectTag+='\t<param name="allowScriptAccess" value="always" />\n';objectTag+='\t<param name="movie" value="'+pURL+'" />\n';objectTag+='\t<param name="quality" value="high" />\n';objectTag+='\t<param name="bgcolor" value="#ffffff" />\n';objectTag+='\t<param name="wmode" value="transparent" />\n';objectTag+='\t<param name="FlashVars" value="clickTag='+pClickThrough+'" />\n';objectTag+='\t<embed src="'+pURL+'" quality="high" bgcolor="#ffffff" width="300" height="250" name="expandedBanner" align="middle" allowScriptAccess="always" wmode="transparent" type="application/x-shockwave-flash" pluginspage="http://www.macromedia.com/go/getflashplayer" FlashVars="clickTag='+pClickThrough+'" />\n';objectTag+='</object>\n';return objectTag;} function createImage(pURL,pClickThrough){var HTML="";if(pClickThrough!=""){HTML="<a href='"+pClickThrough+"' target='_blank' ><img src='"+pURL+"' /></a>\n";} return HTML;} this.setXMLString=function(pXML){xml=pXML;this.parse();};this.setType=function(pType){ad.type=pType;};this.getType=function(){return ad.type;};this.getExpandedBanner=function(){return(expandedBannerURL.indexOf('.swf')!==-1)?createSWF(expandedBannerURL,expandedBannerClickURL):createImage(expandedBannerURL,expandedBannerClickURL);};this.getCollapsedAd=function(){return(collapsedBannerURL.indexOf('.swf')!==-1)?createSWF(collapsedBannerURL,collapsedBannerClickURL):createImage(collapsedBannerURL,collapsedBannerClickURL);};this.getPlayerAd=function(){return ad;};this.parse=function(){var xmlDoc=getXML();var nodeItems=xmlDoc.firstChild.childNodes.length;var currentNode=xmlDoc.firstChild.firstChild;ad.duration=(xmlDoc.firstChild.getAttribute("duration")!==""&&xmlDoc.firstChild.getAttribute("duration")!==null)?Number(xmlDoc.firstChild.getAttribute("duration")):15;if(xmlDoc.firstChild.getAttribute("trackStartURLs")!==""&&xmlDoc.firstChild.getAttribute("trackStartURLs")!==null){ad.trackStartURLs=xmlDoc.firstChild.getAttribute("trackStartURLs").split(",");} if(xmlDoc.firstChild.getAttribute("trackMidURLs")!==""&&xmlDoc.firstChild.getAttribute("trackMidURLs")!==null){ad.trackMidURLs=xmlDoc.firstChild.getAttribute("trackMidURLs").split(",");} if(xmlDoc.firstChild.getAttribute("trackEndURLs")!==""&&xmlDoc.firstChild.getAttribute("trackEndURLs")!==null){ad.trackEndURLs=xmlDoc.firstChild.getAttribute("trackEndURLs").split(",");} if(xmlDoc.firstChild.getAttribute("trackPointURLs")&&(xmlDoc.firstChild.getAttribute("trackPointURLs")!=="")){ad.trackPointURLs=xmlDoc.firstChild.getAttribute("trackPointURLs").split(",");ad.trackPointTime=(xmlDoc.firstChild.getAttribute("trackPointTime")&&(xmlDoc.firstChild.getAttribute("trackPointTime")!==""))?Number(xmlDoc.firstChild.getAttribute("trackPointTime")):0;} for(var i=0;i<nodeItems;i++){if(currentNode.nodeName=="videoURL"&&currentNode.firstChild){ad.videoURL=currentNode.firstChild.nodeValue;}else if(currentNode.nodeName=="videoClickURL"&&currentNode.firstChild){ad.videoClickURL=currentNode.firstChild.nodeValue;}else if(currentNode.nodeName.toLowerCase()=="expandedbannerurl"&&currentNode.firstChild){expandedBannerURL=currentNode.firstChild.nodeValue;}else if(currentNode.nodeName.toLowerCase()=="expandedbannerclickurl"&&currentNode.firstChild){expandedBannerClickURL=currentNode.firstChild.nodeValue;}else if(currentNode.nodeName.toLowerCase()=="collapsedbannerurl"&&currentNode.firstChild){collapsedBannerURL=currentNode.firstChild.nodeValue;}else if(currentNode.nodeName.toLowerCase()=="collapsedbannerclickurl"&&currentNode.firstChild){collapsedBannerClickURL=currentNode.firstChild.nodeValue;}else if(currentNode.nodeName.toLowerCase()=="overlayurl"&&currentNode.firstChild){ad.overlayURL=currentNode.firstChild.nodeValue;ad.type="overlay";}else if(currentNode.nodeName.toLowerCase()=="overlayclickurl"&&currentNode.firstChild){ad.overlayClickURL=currentNode.firstChild.nodeValue;}else if(currentNode.nodeName.toLowerCase()=="expandedvideourl"&&currentNode.firstChild){ad.expandedVideoURL=currentNode.firstChild.nodeValue;ad.expandedVideoURLDuration="13";}else if(currentNode.nodeName.toLowerCase()=="expandedvideoclickurl"&&currentNode.firstChild){ad.expandedVideoClickURL=currentNode.firstChild.nodeValue;} currentNode=currentNode.nextSibling;}};this.setXMLString(pXML);};External_Ad.prototype={getExpandedAd:function(){return this.getExpandedBanner();},getCollapsedAd:function(){return this.getCollapsedAd();},getPlayerAd:function(){return this.getPlayerAd();}};