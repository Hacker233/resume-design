/*!
 * escape-html
 * Copyright(c) 2012-2013 TJ Holowaychuk
 * Copyright(c) 2015 Andreas Lubbe
 * Copyright(c) 2015 Tiancheng "Timothy" Gu
 * MIT Licensed
 */
var e=/["'&<>]/,a=function(a){var r,t=""+a,s=e.exec(t);if(!s)return t;var c="",n=0,u=0;for(n=s.index;n<t.length;n++){switch(t.charCodeAt(n)){case 34:r="&quot;";break;case 38:r="&amp;";break;case 39:r="&#39;";break;case 60:r="&lt;";break;case 62:r="&gt;";break;default:continue}u!==n&&(c+=t.substring(u,n)),u=n+1,c+=r}return u!==n?c+t.substring(u,n):c};export{a as e};
