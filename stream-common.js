/* ══════════════════════════════════════════════════════════════════
   TWECHON STREAM — shared config + logic
   Loaded by every page (Home/, Browse/, Show/, Settings/, Dev/).
   Everything account/bookmark/playlist/progress-related is stored in
   this browser's localStorage — there's no backend, so none of it
   syncs across devices or browsers, and passwords are only lightly
   obfuscated (not securely hashed). Fine for a personal/fan site,
   not for anything sensitive.
══════════════════════════════════════════════════════════════════ */

/* ══════════════════════════════════════════════════════════
   CONFIGURATION — edit these values
   Logo/poster paths are root-relative (e.g. /assets/twechon.png).
   Posters are NEW images — drop them into /assets/posters/ using
   the filenames below (or change the paths). Until a poster exists,
   the poster card automatically falls back to showing the logo.
══════════════════════════════════════════════════════════ */
var YT_API_KEY = 'AIzaSyAAZe4Gh8Gutbmh6Mm-wzuiXMw4Sye0_M4'; // ← paste your YouTube Data API v3 key here

// Developer Mode passcode — stored as a SHA-256 hash instead of
// plain text, so casual viewing of this file's source doesn't hand
// someone the actual passcode outright. This is still NOT real
// security — a determined person could brute-force a short passcode
// offline once they have the hash — but it closes the trivial "just
// read the variable" case. Don't use it to protect anything you
// actually need secured.
//
// To set a new passcode: open any browser's console and run
//   crypto.subtle.digest('SHA-256', new TextEncoder().encode('yourNewPasscode'))
//     .then(b => console.log([...new Uint8Array(b)].map(x => x.toString(16).padStart(2,'0')).join('')))
// then paste the printed hash below. The current hash is for
// 'twechon-dev' (the old default).
var DEV_PASSCODE_HASH = '123acf928b00aac44267339c17230a9dfd0181ef66b2d68664cf9b2ee8c37a8b';

// GitHub repo this site lives in — used only by the optional
// "Publish to GitHub" button in Dev Mode, to commit new/updated
// files directly instead of downloading a zip to upload by hand.
// Fill in your GitHub username and this repo's name, exactly as
// they appear in the repo's URL: github.com/<owner>/<repo>.
var GITHUB_OWNER = 'notverzee';
var GITHUB_REPO = 'Twechon-Stream';
var GITHUB_BRANCH = 'main';

var MAX_RESULTS = 10; // videos per page (5×2 grid on show pages)

// Category tabs shown on the Browse page. Each show/channel's
// `category` field below must match one of these `key` values.
// Add/edit/reorder these from Dev Mode (/Dev/) → Shows & Channels,
// or by hand here — the Browse page builds its tabs and rows from
// these lists automatically, so nothing else needs to change.
var SHOW_CATEGORIES = [
  { key: 'original', label: 'Original Shows' },
  { key: 'collaborative', label: 'Collaborative Shows' },
];
var CHANNEL_CATEGORIES = [
  { key: 'twechon', label: 'Twechon Channels' },
  { key: 'co-studio', label: 'Co-Studio Channels' },
];

// Shows — each has a `category`: 'original' (Original Shows tab) or
// 'collaborative' (Collaborative Shows tab). Add YouTube PLAYLIST IDs.
// Find a playlist ID: open the playlist on YouTube, copy the ID from the URL
// e.g. youtube.com/playlist?list=PLxxxxxx  →  playlistId: 'PLxxxxxx'
var SHOWS = [
  {
    slug: 'reality-shift',
    name: 'Reality Shift',
    category: 'original',
    playlistId: 'PL4MFqc9hSf8S0SVPfqoy-H6fp3jH31s9K',
    logo: '/assets/realityshiftlogo.png',
    poster: '/assets/posters/reality-shift-poster.png',
    description: 'Vortex, the creator of the Univerzee, discovers that his creation got the best of him, and nobody worshipped him in this galaxy like they were supposed to. He causes terror and havoc after recruiting Mender to punish Verzee and friends for taking away his leadership.'
  },
  {
    slug: 'sticky',
    name: 'Sticky',
    category: 'original',
    playlistId: 'PL4MFqc9hSf8ScvnRMkNm-uCzv7kNZ7HSm',
    logo: '/assets/stickylogo.png',
    poster: '/assets/posters/sticky-poster.png',
    description: 'A series about a group of Stick friends with several jokes and punchlines, alongside some occasional lore and angst that the crew has to sort out.'
  },
  {
    slug: 'gorilla-gang',
    name: 'Gorilla Gang',
    category: 'original',
    playlistId: 'PLADnMNkttUY7fXieCm-OuL_aDx_4LNl6J',
    logo: '/assets/gorillaganglogo.png', // ← not in your current assets list, add one
    poster: '/assets/posters/gorilla-gang-poster.png',
    description: 'In Gorilla World, things are anything but calm. Ruthless villains popping out of nowhere, hackers modding the game trying to destroy everybodys fun, but only one group of brave gorillas is able to stand their ground and take their villains 1-on-1.'
  },
  {
    slug: 'sketchsquad',
    name: 'Sketchsquad',
    category: 'collaborative',
    playlistId: 'PL-TqK5sD9LyrWC18v2fn04h4zPMg5sgGa',
    logo: '/assets/sketchsquadlogo.png',
    poster: '/assets/posters/sketchsquad-poster.png',
    description: 'A group of artists—cartoonists, animators, musicians, etc.—who play major roles at Radiostar Productions come together to share wacky life anecdotes, behind-the-scenes stories, and share friendly but teasing banter.'
  },
  {
    slug: 'Fateful-SMP',
    name: 'Fateful SMP',
    category: 'collaborative',
    playlistId: 'PLEJHHRnp7Y1g',
    logo: '/assets/fatefulsmp.png',
    poster: '/assets/posters/fateful-smp-poster.png',
    description: 'The beginning of GoldenV2 and Nightclaws reign.'
  },
  {
    slug: 'Earth-SMP',
    name: 'Earth SMP',
    category: 'collaborative',
    playlistId: 'PLB_O81UDTE20',
    logo: '/assets/earthsmp.png',
    poster: '/assets/posters/earth-smp-poster.png',
    description: 'The EarthSMP is a hardcore minecraft world, after you die, its over.'
  },
  // { slug: 'mamflux', name: 'Mamflux', category: 'original', playlistId: 'PLxxxxxx', logo: '/assets/mamfluxlogo.png', poster: '/assets/posters/mamflux-poster.png', description: '…' },
  // { slug: 'my-reflections-bleed', name: 'My Reflections Bleed', category: 'collaborative', playlistId: 'PLxxxxxx', logo: '/assets/mrblogowhite.png', poster: '/assets/posters/my-reflections-bleed-poster.png', description: '…' },
];

// Recent Animations — stays as its own row at the bottom of the homepage (not a poster/show page)
var RECENT_ANIMATIONS = {
  name: 'Recent Animations',
  playlistId: 'PL4MFqc9hSf8Rpq3HK027Cl0QWxtoAgJ9B'
};

// Channels — each has a `category`: 'twechon' (Twechon Channels tab) or
// 'co-studio' (Co-Studio Channels tab). Add real YouTube CHANNEL IDs.
// Find channel ID: YouTube Studio → Settings → Channel → Advanced → Channel ID
var CHANNELS = [
  {
    slug: 'twechon',
    name: 'Twechon',
    category: 'twechon',
    handle: '@twechon',
    channelId: 'UCK8ZJPbFdRcFtXIxwVWhUSQ',
    logo: '/assets/twechon.png',
    poster: '/assets/posters/twechon-poster.png',
    description: 'The main channel — animations, original series, and general content.'
  },
  {
    slug: 'cosmic-frame',
    name: 'Cosmic Frame',
    category: 'twechon',
    handle: '@cosmicframeprod',
    channelId: 'UCYhuvv01bKeh_Bx8gP54z1Q',
    logo: '/assets/cosmicframelogowhite.png',
    poster: '/assets/posters/cosmic-frame-poster.png',
    description: 'The animation-focused channel — home of the original animated series.'
  },
  {
    slug: 'twechon-gaming',
    name: 'Twechon Gaming',
    category: 'twechon',
    handle: '@twechongaming',
    channelId: 'UC3MiXJqQ_UEAboPpnuOs82g',
    logo: '/assets/twechongaming.png',
    poster: '/assets/posters/twechon-gaming-poster.png',
    description: 'Gaming content — playthroughs, highlights, and commentary.'
  },
  {
    slug: 'twechon-extras',
    name: 'Twechon Extras',
    category: 'twechon',
    handle: '@twechonextras',
    channelId: 'UCKZAjiOvDknt3KuNUxdUB7A',
    logo: '/assets/twechonextras.png',
    poster: '/assets/posters/twechon-extras-poster.png',
    description: 'Behind the scenes, extras, and bonus content.'
  },
  {
    slug: 'twechon-tunes',
    name: 'Twechon Tunes',
    category: 'twechon',
    handle: '@twechontunes',
    channelId: 'UCAhqC7Vw2gpYpaEi0EAi0Cg',
    logo: '/assets/twechontunes.png',
    poster: '/assets/posters/twechon-tunes-poster.png',
    description: 'Music, OSTs, and audio content from the Twechon universe.'
  },
  {
    slug: 'twechon-vr',
    name: 'Twechon VR',
    category: 'twechon',
    handle: '@twechonvr',
    channelId: 'UCqarEtsvZJ2CX7lEqAbgYKw',
    logo: '/assets/twechonvr.png',
    poster: '/assets/posters/twechon-vr-poster.png',
    description: 'VR gameplay, experiences, and virtual world exploration.'
  },
  {
    slug: 'twechon-craft',
    name: 'Twechon Craft',
    category: 'twechon',
    handle: '@twechoncraft',
    channelId: 'UCZr8geyYXjKVjbrgerUq5xQ',
    logo: '/assets/twechoncraft.png',
    poster: '/assets/posters/twechon-craft-poster.png',
    description: 'Minecraft content — builds, survival, and creative adventures.'
  },
  {
    slug: 'radiostar-productions',
    name: 'Radiostar Productions',
    category: 'co-studio',
    handle: null,
    channelId: 'UCd8XOYnGVMjWOUlWP05MsGg',
    logo: '/assets/radiostarproductionslogo.png', // ← not in your current assets list, add one
    poster: '/assets/posters/radiostar-productions-poster.png',
    description: 'Radiostar Productions is an indie animation studio built on the concept that entertainment should not be seen as a distraction, because with the right theme and the right writing, a good story can change someone’s life for the better.'
  },
  {
    slug: 'skysoar',
    name: 'SkySoar',
    category: 'co-studio',
    handle: null,
    channelId: 'UC_ej9rozMpUzEyKj_EpTwSg',
    logo: '/assets/skysoarlogo.png', // ← not in your current assets list, add one
    poster: '/assets/posters/skysoar-poster.png',
    description: '"Die with memories, not dreams."'
  },
  {
    slug: 'abeegtree',
    name: 'ABEEGTREE',
    category: 'co-studio',
    handle: null,
    channelId: 'UCV-DKulMnq4H5ekip38WDmw',
    logo: '/assets/abeegtreelogo.png', // ← not in your current assets list, add one
    poster: '/assets/posters/abeegtree-poster.png',
    description: 'I make funny stuff, ig. Please just help me. Also likes Kerbal Space Program and any other space stuff, its most of my content.'
  },
];

// Homepage news banner — drop matching image + text file pairs into
// /assets/news/. Each .txt file must have exactly 3 lines:
//   Line 1: headline
//   Line 2: short description (shown on the homepage banner)
//   Line 3: link — the external URL for this story. It's no longer
//           used directly by the banner/header button; instead both
//           now open this item's own page (/news/1/, /news/2/,
//           /news/3/), which is a separate full-article page with
//           its own title/image/long description and a button that
//           finally goes to this link. Generate that page's HTML
//           from Dev Mode (/Dev/) rather than writing it by hand.
// News1 is treated as the most recent/featured item. Missing pairs
// are skipped automatically, so you don't need all three at once.
// NOTE: filenames below match exactly what was requested — note the
// third pair intentionally uses a lowercase "news3", unlike News1/News2.
var NEWS_FILES = [
  { image: '/assets/news/News1.png', text: '/assets/news/News1.txt' },
  { image: '/assets/news/News2.png', text: '/assets/news/News2.txt' },
  { image: '/assets/news/news3.png', text: '/assets/news/news3.txt' },
];

function loadNewsItems(callback) {
  var results = [];
  var remaining = NEWS_FILES.length;
  if (!remaining) { callback([]); return; }
  NEWS_FILES.forEach(function(entry, idx) {
    fetch(entry.text).then(function(r) {
      if (!r.ok) throw new Error('missing');
      return r.text();
    }).then(function(raw) {
      var lines = raw.split(/\r?\n/).map(function(l){ return l.trim(); }).filter(function(l){ return l.length; });
      if (lines.length < 3) throw new Error('malformed');
      results[idx] = { slot: idx + 1, image: entry.image, title: lines[0], description: lines[1], link: lines[2] };
    }).catch(function() {
      results[idx] = null;
    }).finally(function() {
      remaining--;
      if (remaining === 0) callback(results.filter(function(r){ return r; }));
    });
  });
}

/* ── News notification bell (header) — shared by Home and Browse ──
   Populates the bell's dropdown with the same items the homepage
   banner shows; clicking an item opens that item's /news/N/ page. */
function initNewsNotifications() {
  var bellBtn      = document.getElementById('header-bell-btn');
  var bellDot      = document.getElementById('header-bell-dot');
  var notifDropdown = document.getElementById('notification-dropdown');
  if (!bellBtn || !notifDropdown) return;

  bellBtn.addEventListener('click', function(e) { e.stopPropagation(); notifDropdown.classList.toggle('open'); });
  notifDropdown.addEventListener('click', function(e) { e.stopPropagation(); });
  document.addEventListener('click', function() { notifDropdown.classList.remove('open'); });

  loadNewsItems(function(items) {
    if (!items.length) {
      notifDropdown.innerHTML = '<div class="notification-empty">No news posted yet.</div>';
      return;
    }
    if (bellDot) bellDot.classList.add('show');
    notifDropdown.innerHTML = '';
    items.forEach(function(item) {
      var a = document.createElement('a');
      a.className = 'notification-item';
      a.href = '/news/' + item.slot + '/';
      var safeTitle = item.title.replace(/"/g, '&quot;');
      a.innerHTML =
        '<div class="notification-thumb"><img src="' + item.image + '" alt="' + safeTitle + '"></div>' +
        '<div class="notification-text"><div class="notification-title"></div><div class="notification-desc"></div></div>';
      a.querySelector('.notification-title').textContent = item.title;
      a.querySelector('.notification-desc').textContent = item.description;
      notifDropdown.appendChild(a);
    });
  });
}

function getShowBySlug(slug) {
  for (var i = 0; i < SHOWS.length; i++) { if (SHOWS[i].slug === slug) return SHOWS[i]; }
  return null;
}
function getChannelBySlug(slug) {
  for (var i = 0; i < CHANNELS.length; i++) { if (CHANNELS[i].slug === slug) return CHANNELS[i]; }
  return null;
}

/* ══════════════════════════════════════════════════════════
   STAR BACKGROUND
══════════════════════════════════════════════════════════ */
(function(){
  var c=document.getElementById('star-canvas');
  if (!c) return;
  var ctx=c.getContext('2d'),W,H,stars=[],nebulas=[];
  function resize(){W=c.width=window.innerWidth;H=c.height=window.innerHeight;}
  function rand(a,b){return a+Math.random()*(b-a);}
  function init(){
    stars=Array.from({length:200},()=>({x:Math.random()*W,y:Math.random()*H,r:rand(.3,1.7),alpha:rand(.2,1),aDir:Math.random()>.5?1:-1,aSpd:rand(.002,.007),vx:rand(-.04,.04),vy:rand(-.02,.02)}));
    nebulas=Array.from({length:4},()=>({x:Math.random()*W,y:Math.random()*H,r:rand(120,240),hue:Math.random()>.5?270:300,alpha:rand(.04,.08),dx:rand(-.12,.12),dy:rand(-.07,.07)}));
  }
  function draw(){
    ctx.clearRect(0,0,W,H);
    nebulas.forEach(function(n){var g=ctx.createRadialGradient(n.x,n.y,0,n.x,n.y,n.r);g.addColorStop(0,'hsla('+n.hue+',80%,55%,'+n.alpha+')');g.addColorStop(1,'transparent');ctx.fillStyle=g;ctx.beginPath();ctx.arc(n.x,n.y,n.r,0,Math.PI*2);ctx.fill();n.x+=n.dx;n.y+=n.dy;if(n.x<-n.r)n.x=W+n.r;if(n.x>W+n.r)n.x=-n.r;if(n.y<-n.r)n.y=H+n.r;if(n.y>H+n.r)n.y=-n.r;});
    stars.forEach(function(s){s.alpha+=s.aDir*s.aSpd;if(s.alpha>=1){s.alpha=1;s.aDir=-1;}if(s.alpha<=.1){s.alpha=.1;s.aDir=1;}s.x+=s.vx;s.y+=s.vy;if(s.x<0)s.x=W;if(s.x>W)s.x=0;if(s.y<0)s.y=H;if(s.y>H)s.y=0;ctx.beginPath();ctx.arc(s.x,s.y,s.r,0,Math.PI*2);ctx.fillStyle='rgba(255,255,255,'+s.alpha+')';ctx.fill();});
    requestAnimationFrame(draw);
  }
  window.addEventListener('resize',function(){resize();init();});
  resize();init();draw();
})();

/* ══════════════════════════════════════════════════════════
   ACCOUNTS, BOOKMARKS, PLAYLISTS & WATCH PROGRESS
══════════════════════════════════════════════════════════ */
var USERS_KEY   = 'twechon_users';
var SESSION_KEY = 'twechon_session';

function hashPw(pw) {
  var h = 5381;
  for (var i = 0; i < pw.length; i++) { h = ((h << 5) + h) + pw.charCodeAt(i); h = h & h; }
  return 'h' + h;
}
function getUsers() {
  try { return JSON.parse(localStorage.getItem(USERS_KEY)) || {}; }
  catch (e) { return {}; }
}
function saveUsers(db) { localStorage.setItem(USERS_KEY, JSON.stringify(db)); }
function getSession() { return localStorage.getItem(SESSION_KEY) || null; }
function setSession(username) { localStorage.setItem(SESSION_KEY, username); }
function clearSession() { localStorage.removeItem(SESSION_KEY); }

function defaultUserData() { return { passwordHash: '', displayName: '', profilePicture: null, bookmarks: {}, showBookmarks: {}, playlists: {}, progress: {} }; }

function currentUserData() {
  var user = getSession();
  if (!user) return null;
  var db = getUsers();
  return db[user] || null;
}
function updateCurrentUserData(mutator) {
  var user = getSession();
  if (!user) return;
  var db = getUsers();
  if (!db[user]) return;
  mutator(db[user]);
  saveUsers(db);
}

function registerUser(username, password) {
  username = username.trim();
  if (username.length < 3) return { ok:false, error:'Username must be at least 3 characters.' };
  if (password.length < 4) return { ok:false, error:'Password must be at least 4 characters.' };
  var db = getUsers();
  var key = username.toLowerCase();
  if (db[key]) return { ok:false, error:'That username is already taken.' };
  var rec = defaultUserData();
  rec.passwordHash = hashPw(password);
  rec.displayName = username;
  db[key] = rec;
  saveUsers(db);
  setSession(key);
  return { ok:true };
}
function loginUser(username, password) {
  var key = username.trim().toLowerCase();
  var db = getUsers();
  var rec = db[key];
  if (!rec || rec.passwordHash !== hashPw(password)) return { ok:false, error:'Incorrect username or password.' };
  setSession(key);
  return { ok:true };
}
function logoutUser() { clearSession(); }

/* ── Profile picture ── */
function setProfilePicture(dataUrl) {
  updateCurrentUserData(function(rec) { rec.profilePicture = dataUrl; });
}
function removeProfilePicture() {
  updateCurrentUserData(function(rec) { rec.profilePicture = null; });
}
// Downscale + compress a picked image file before storing it in
// localStorage — keeps account data small regardless of how large
// the original photo was.
function resizeImageFile(file, maxSize, callback) {
  var reader = new FileReader();
  reader.onload = function(e) {
    var img = new Image();
    img.onload = function() {
      var scale = Math.min(1, maxSize / Math.max(img.width, img.height));
      var canvas = document.createElement('canvas');
      canvas.width = Math.max(1, Math.round(img.width * scale));
      canvas.height = Math.max(1, Math.round(img.height * scale));
      var ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      callback(canvas.toDataURL('image/jpeg', 0.85));
    };
    img.onerror = function() { callback(null); };
    img.src = e.target.result;
  };
  reader.onerror = function() { callback(null); };
  reader.readAsDataURL(file);
}

/* ── Export / import account data (Settings page) ──
   Since everything lives in this browser's localStorage, this is the
   only way to carry bookmarks/playlists/progress to a new device or
   browser: export a .json file here, then import it there. The file
   includes the account's password hash (not the real password) so
   the same login works after importing — keep the file itself
   somewhere private, the same way you'd treat a password. */
function exportUserData(username) {
  var db = getUsers();
  var key = username.toLowerCase();
  var rec = db[key];
  if (!rec) return null;
  return {
    twechonExport: true,
    version: 1,
    exportedAt: new Date().toISOString(),
    username: key,
    data: rec
  };
}
function downloadUserData(username) {
  var payload = exportUserData(username);
  if (!payload) return false;
  var blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
  var url = URL.createObjectURL(blob);
  var a = document.createElement('a');
  a.href = url;
  a.download = 'twechon-' + username.toLowerCase() + '.json';
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
  return true;
}
function importUserData(jsonText) {
  var parsed;
  try { parsed = JSON.parse(jsonText); }
  catch (e) { return { ok:false, error:'That file isn\u2019t valid — make sure you selected the .json file downloaded from Settings.' }; }
  if (!parsed || !parsed.twechonExport || !parsed.username || !parsed.data) {
    return { ok:false, error:'That doesn\u2019t look like a Twechon Stream export file.' };
  }
  var key = String(parsed.username).toLowerCase();
  var db = getUsers();
  db[key] = parsed.data;
  saveUsers(db);
  setSession(key);
  return { ok:true, username: key };
}

/* Video bookmarks */
function isBookmarked(videoId) {
  var data = currentUserData();
  return !!(data && data.bookmarks && data.bookmarks[videoId]);
}
function toggleBookmark(videoId, meta) {
  var nowBookmarked = false;
  updateCurrentUserData(function(rec) {
    if (!rec.bookmarks) rec.bookmarks = {};
    if (rec.bookmarks[videoId]) { delete rec.bookmarks[videoId]; nowBookmarked = false; }
    else { rec.bookmarks[videoId] = { videoId: meta.videoId, title: meta.title, publishedAt: meta.publishedAt || null, savedAt: Date.now() }; nowBookmarked = true; }
  });
  notifyBookmarksChanged();
  return nowBookmarked;
}
function getBookmarksArray() {
  var data = currentUserData();
  if (!data || !data.bookmarks) return [];
  return Object.keys(data.bookmarks).map(function(k){ return data.bookmarks[k]; })
    .sort(function(a,b){ return (b.savedAt||0) - (a.savedAt||0); });
}

/* Show / channel bookmarks */
function isShowBookmarked(id) {
  var data = currentUserData();
  return !!(data && data.showBookmarks && data.showBookmarks[id]);
}
function toggleShowBookmark(id, meta) {
  var nowBookmarked = false;
  updateCurrentUserData(function(rec) {
    if (!rec.showBookmarks) rec.showBookmarks = {};
    if (rec.showBookmarks[id]) { delete rec.showBookmarks[id]; nowBookmarked = false; }
    else { rec.showBookmarks[id] = { id: meta.id, type: meta.type, name: meta.name, handle: meta.handle || null, logo: meta.logo || null, poster: meta.poster || null, savedAt: Date.now() }; nowBookmarked = true; }
  });
  notifyShowBookmarksChanged();
  return nowBookmarked;
}
function getShowBookmarksArray() {
  var data = currentUserData();
  if (!data || !data.showBookmarks) return [];
  return Object.keys(data.showBookmarks).map(function(k){ return data.showBookmarks[k]; })
    .sort(function(a,b){ return (b.savedAt||0) - (a.savedAt||0); });
}

/* Playlists */
function getPlaylistNames() {
  var data = currentUserData();
  if (!data || !data.playlists) return [];
  return Object.keys(data.playlists);
}
function createPlaylist(name) {
  name = name.trim();
  if (!name) return { ok:false, error:'Enter a playlist name.' };
  var result = { ok:true };
  updateCurrentUserData(function(rec) {
    if (!rec.playlists) rec.playlists = {};
    if (rec.playlists[name]) { result = { ok:false, error:'You already have a playlist with that name.' }; return; }
    rec.playlists[name] = {};
  });
  return result;
}
function deletePlaylist(name) {
  updateCurrentUserData(function(rec) { if (rec.playlists) delete rec.playlists[name]; });
  notifyPlaylistsChanged();
}
function isInPlaylist(name, videoId) {
  var data = currentUserData();
  return !!(data && data.playlists && data.playlists[name] && data.playlists[name][videoId]);
}
function togglePlaylistVideo(name, videoId, meta) {
  updateCurrentUserData(function(rec) {
    if (!rec.playlists) rec.playlists = {};
    if (!rec.playlists[name]) rec.playlists[name] = {};
    if (rec.playlists[name][videoId]) delete rec.playlists[name][videoId];
    else rec.playlists[name][videoId] = { videoId: meta.videoId, title: meta.title, publishedAt: meta.publishedAt || null, addedAt: Date.now() };
  });
  notifyPlaylistsChanged();
}
function getPlaylistArray(name) {
  var data = currentUserData();
  if (!data || !data.playlists || !data.playlists[name]) return [];
  var pl = data.playlists[name];
  return Object.keys(pl).map(function(k){ return pl[k]; })
    .sort(function(a,b){ return (b.addedAt||0) - (a.addedAt||0); });
}

/* Watch progress */
function getProgress(videoId) {
  var data = currentUserData();
  if (!data || !data.progress) return 0;
  return data.progress[videoId] || 0;
}
function setProgress(videoId, seconds) {
  if (!getSession()) return;
  updateCurrentUserData(function(rec) { if (!rec.progress) rec.progress = {}; rec.progress[videoId] = seconds; });
}
function clearProgress(videoId) {
  if (!getSession()) return;
  updateCurrentUserData(function(rec) { if (rec.progress) delete rec.progress[videoId]; });
}

function requireLogin() {
  if (getSession()) return true;
  openAuthModal('login');
  return false;
}

/* ── Developer Mode unlock (Dev/index.html) ──
   Correct passcode flips a sessionStorage flag, cleared automatically
   when the tab/browser closes. unlockDev() is now async (it hashes
   the entered passcode before comparing), so callers need to use
   .then() or await — see Dev/index.html's tryUnlock(). */
var DEV_SESSION_KEY = 'twechon_dev_unlocked';
function isDevUnlocked() { return sessionStorage.getItem(DEV_SESSION_KEY) === '1'; }
function sha256Hex(text) {
  return crypto.subtle.digest('SHA-256', new TextEncoder().encode(text)).then(function(buf) {
    return Array.from(new Uint8Array(buf)).map(function(b) { return b.toString(16).padStart(2, '0'); }).join('');
  });
}
function unlockDev(passcode) {
  return sha256Hex(passcode).then(function(hash) {
    if (hash !== DEV_PASSCODE_HASH) return false;
    sessionStorage.setItem(DEV_SESSION_KEY, '1');
    return true;
  });
}
function lockDev() { sessionStorage.removeItem(DEV_SESSION_KEY); }

/* ── GitHub direct-publish (optional) ──
   Lets Dev Mode commit files straight to this repo via GitHub's API,
   instead of downloading a zip to upload by hand. Requires a
   fine-grained Personal Access Token scoped to ONLY this repo, with
   ONLY "Contents: Read and write" permission — nothing else. You
   paste it in fresh each Dev Mode session; it's held in
   sessionStorage (cleared the moment the tab closes) and is never
   written into any file, so it never ends up in this public repo.
   The zip-download workflow still works too — this is an additional
   option, not a replacement.
   Note: GitHub's simple Contents API commits one file at a time, so
   publishing several files at once creates several commits rather
   than one atomic commit — harmless, just a bit more commit history
   than a single "real" commit would have. */
var GITHUB_TOKEN_KEY = 'twechon_dev_gh_token';
function getGithubToken() { return sessionStorage.getItem(GITHUB_TOKEN_KEY) || ''; }
function setGithubToken(token) { sessionStorage.setItem(GITHUB_TOKEN_KEY, token); }
function clearGithubToken() { sessionStorage.removeItem(GITHUB_TOKEN_KEY); }
function hasGithubConfig() {
  return GITHUB_OWNER && GITHUB_OWNER.indexOf('YOUR-') !== 0 && GITHUB_REPO && GITHUB_REPO.indexOf('YOUR-') !== 0;
}

function githubGetFileSha(path, token) {
  return fetch('https://api.github.com/repos/' + GITHUB_OWNER + '/' + GITHUB_REPO + '/contents/' + path + '?ref=' + GITHUB_BRANCH, {
    headers: { 'Authorization': 'Bearer ' + token, 'Accept': 'application/vnd.github+json' }
  }).then(function(r) { return r.ok ? r.json() : null; })
    .then(function(data) { return data ? data.sha : null; })
    .catch(function() { return null; });
}

// content: raw text OR a base64 string (set isBase64 true for images)
function githubPutFile(path, content, isBase64, token, commitMessage) {
  var base64Content = isBase64 ? content : btoa(unescape(encodeURIComponent(content)));
  return githubGetFileSha(path, token).then(function(sha) {
    var body = { message: commitMessage, content: base64Content, branch: GITHUB_BRANCH };
    if (sha) body.sha = sha;
    return fetch('https://api.github.com/repos/' + GITHUB_OWNER + '/' + GITHUB_REPO + '/contents/' + path, {
      method: 'PUT',
      headers: {
        'Authorization': 'Bearer ' + token,
        'Accept': 'application/vnd.github+json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    }).then(function(r) {
      if (!r.ok) return r.json().then(function(err) { throw new Error((err && err.message) || ('GitHub API error ' + r.status)); });
      return r.json();
    });
  });
}

// files: [{ path, content, isBase64 }, ...] — published one at a time,
// in order, so a failure partway through leaves earlier files already
// committed rather than losing everything. onProgress(done, total, path)
// fires after each successful commit.
function githubPublishFiles(files, token, commitMessagePrefix, onProgress) {
  var done = 0;
  function next(i) {
    if (i >= files.length) return Promise.resolve();
    var f = files[i];
    return githubPutFile(f.path, f.content, f.isBase64, token, commitMessagePrefix + ': ' + f.path)
      .then(function() {
        done++;
        if (onProgress) onProgress(done, files.length, f.path);
        return next(i + 1);
      });
  }
  return next(0);
}

function formatTime(seconds) {
  seconds = Math.max(0, Math.floor(seconds || 0));
  var m = Math.floor(seconds / 60);
  var s = seconds % 60;
  return m + ':' + (s < 10 ? '0' : '') + s;
}

/* ── Change hooks — pages optionally define onAuthChangedPage /
   onBookmarksChanged / onShowBookmarksChanged / onPlaylistsChanged
   to refresh their own list views. Icon states everywhere always
   refresh automatically. ── */
function refreshBookmarkIcons() {
  document.querySelectorAll('.bookmark-btn').forEach(function(b) {
    b.classList.toggle('bookmarked', isBookmarked(b.dataset.videoId));
  });
}
function refreshShowBookmarkIcons() {
  document.querySelectorAll('.show-bookmark-target').forEach(function(el) {
    el.classList.toggle('bookmarked', isShowBookmarked(el.dataset.showId));
  });
}
function notifyBookmarksChanged() {
  refreshBookmarkIcons();
  if (typeof onBookmarksChanged === 'function') onBookmarksChanged();
}
function notifyShowBookmarksChanged() {
  refreshShowBookmarkIcons();
  if (typeof onShowBookmarksChanged === 'function') onShowBookmarksChanged();
}
function notifyPlaylistsChanged() {
  if (typeof onPlaylistsChanged === 'function') onPlaylistsChanged();
}
function onAuthChanged() {
  renderAuthArea();
  refreshBookmarkIcons();
  refreshShowBookmarkIcons();
  if (typeof onAuthChangedPage === 'function') onAuthChangedPage();
}
function activateTab(tab) {
  var btn = document.querySelector('.tab-btn[data-tab="' + tab + '"]');
  if (btn) btn.click();
}

/* ══════════════════════════════════════════════════════════
   AUTH UI
══════════════════════════════════════════════════════════ */
var authModal    = document.getElementById('auth-modal');
var authArea     = document.getElementById('auth-area');
var loginForm    = document.getElementById('login-form');
var signupForm   = document.getElementById('signup-form');
var authTabLogin = document.getElementById('auth-tab-login');
var authTabSignup= document.getElementById('auth-tab-signup');
var loginError   = document.getElementById('login-error');
var signupError  = document.getElementById('signup-error');

function openAuthModal(mode) {
  switchAuthTab(mode || 'login');
  loginError.textContent = '';
  signupError.textContent = '';
  authModal.classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeAuthModal() {
  authModal.classList.remove('open');
  document.body.style.overflow = '';
}
function switchAuthTab(mode) {
  var isLogin = mode === 'login';
  authTabLogin.classList.toggle('active', isLogin);
  authTabSignup.classList.toggle('active', !isLogin);
  loginForm.classList.toggle('hidden', !isLogin);
  signupForm.classList.toggle('hidden', isLogin);
}
authTabLogin.addEventListener('click', function(){ switchAuthTab('login'); });
authTabSignup.addEventListener('click', function(){ switchAuthTab('signup'); });
document.getElementById('auth-modal-close').addEventListener('click', closeAuthModal);
authModal.addEventListener('click', function(e){ if (e.target === authModal) closeAuthModal(); });

loginForm.addEventListener('submit', function(e) {
  e.preventDefault();
  var res = loginUser(document.getElementById('login-username').value, document.getElementById('login-password').value);
  if (!res.ok) { loginError.textContent = res.error; return; }
  loginForm.reset();
  closeAuthModal();
  onAuthChanged();
});
signupForm.addEventListener('submit', function(e) {
  e.preventDefault();
  var res = registerUser(document.getElementById('signup-username').value, document.getElementById('signup-password').value);
  if (!res.ok) { signupError.textContent = res.error; return; }
  signupForm.reset();
  closeAuthModal();
  onAuthChanged();
});

function renderAuthArea() {
  var user = getSession();
  authArea.innerHTML = '';
  if (!user) {
    var loginBtn = document.createElement('button');
    loginBtn.type = 'button'; loginBtn.className = 'auth-btn'; loginBtn.textContent = 'Log In';
    loginBtn.addEventListener('click', function(){ openAuthModal('login'); });
    var signupBtn = document.createElement('button');
    signupBtn.type = 'button'; signupBtn.className = 'auth-btn primary'; signupBtn.textContent = 'Sign Up';
    signupBtn.addEventListener('click', function(){ openAuthModal('signup'); });
    authArea.appendChild(loginBtn);
    authArea.appendChild(signupBtn);
    return;
  }
  var data = currentUserData();
  var displayName = (data && data.displayName) || user;
  var wrap = document.createElement('div');
  wrap.style.position = 'relative';
  var btn = document.createElement('button');
  btn.type = 'button'; btn.className = 'user-menu-btn';
  var avatarHtml = (data && data.profilePicture)
    ? '<span class="user-avatar" style="background-image:url(\'' + data.profilePicture + '\');background-size:cover;background-position:center;"></span>'
    : '<span class="user-avatar">' + displayName.charAt(0) + '</span>';
  btn.innerHTML = avatarHtml + displayName + ' \u25be';
  var dropdown = document.createElement('div');
  dropdown.className = 'user-dropdown';
  var onBrowse = /\/Browse\/?(index\.html)?$/i.test(window.location.pathname);
  dropdown.innerHTML =
    (onBrowse
      ? '<button type="button" data-action="bookmarks">\u2605 My Bookmarks</button>' +
        '<button type="button" data-action="playlists">My Playlists</button>'
      : '<a href="/Browse/#bookmarks" style="display:block;text-decoration:none;color:inherit;">' +
          '<button type="button" style="width:100%;text-align:left;background:none;border:none;color:inherit;font:inherit;padding:9px 10px;border-radius:6px;cursor:pointer;">\u2605 My Bookmarks</button></a>' +
        '<a href="/Browse/#playlists" style="display:block;text-decoration:none;color:inherit;">' +
          '<button type="button" style="width:100%;text-align:left;background:none;border:none;color:inherit;font:inherit;padding:9px 10px;border-radius:6px;cursor:pointer;">My Playlists</button></a>'
    ) +
    '<a href="/Settings/" style="display:block;text-decoration:none;color:inherit;">' +
      '<button type="button" style="width:100%;text-align:left;background:none;border:none;color:inherit;font:inherit;padding:9px 10px;border-radius:6px;cursor:pointer;">\u2699 Settings</button></a>' +
    '<button type="button" class="danger" data-action="logout">Log Out</button>';
  btn.addEventListener('click', function(e){ e.stopPropagation(); dropdown.classList.toggle('open'); });
  dropdown.addEventListener('click', function(e) {
    var b = e.target.closest('button');
    if (!b) return;
    var action = b.dataset.action;
    dropdown.classList.remove('open');
    if (action === 'logout') { logoutUser(); onAuthChanged(); }
    else if (action === 'bookmarks') { activateTab('bookmarks'); }
    else if (action === 'playlists') { activateTab('playlists'); }
  });
  document.addEventListener('click', function(){ dropdown.classList.remove('open'); });
  wrap.appendChild(btn);
  wrap.appendChild(dropdown);
  authArea.appendChild(wrap);
}

/* ══════════════════════════════════════════════════════════
   ADD-TO-PLAYLIST MODAL
══════════════════════════════════════════════════════════ */
var playlistModal        = document.getElementById('playlist-modal');
var playlistList         = document.getElementById('playlist-list');
var newPlaylistInput     = document.getElementById('new-playlist-name');
var newPlaylistBtn       = document.getElementById('new-playlist-btn');
var playlistModalVideoMeta = null;

function openPlaylistModal(videoId, meta) {
  playlistModalVideoMeta = meta;
  renderPlaylistPicker();
  playlistModal.classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closePlaylistModal() {
  playlistModal.classList.remove('open');
  document.body.style.overflow = '';
  playlistModalVideoMeta = null;
}
document.getElementById('playlist-modal-close').addEventListener('click', closePlaylistModal);
playlistModal.addEventListener('click', function(e){ if (e.target === playlistModal) closePlaylistModal(); });

function renderPlaylistPicker() {
  playlistList.innerHTML = '';
  var names = getPlaylistNames();
  if (!names.length) {
    var empty = document.createElement('div');
    empty.className = 'empty-state';
    empty.textContent = "You don't have any playlists yet — create one below.";
    playlistList.appendChild(empty);
    return;
  }
  names.forEach(function(name) {
    var row = document.createElement('label');
    row.className = 'playlist-row';
    var checked = playlistModalVideoMeta ? isInPlaylist(name, playlistModalVideoMeta.videoId) : false;
    row.innerHTML = '<input type="checkbox" ' + (checked ? 'checked' : '') + '><span></span>';
    row.querySelector('span').textContent = name;
    row.querySelector('input').addEventListener('change', function() {
      togglePlaylistVideo(name, playlistModalVideoMeta.videoId, playlistModalVideoMeta);
    });
    playlistList.appendChild(row);
  });
}

newPlaylistBtn.addEventListener('click', function() {
  var name = newPlaylistInput.value.trim();
  if (!name) return;
  var res = createPlaylist(name);
  if (!res.ok) { alert(res.error); return; }
  if (playlistModalVideoMeta) togglePlaylistVideo(name, playlistModalVideoMeta.videoId, playlistModalVideoMeta);
  newPlaylistInput.value = '';
  renderPlaylistPicker();
  notifyPlaylistsChanged();
});
newPlaylistInput.addEventListener('keydown', function(e) { if (e.key === 'Enter') { e.preventDefault(); newPlaylistBtn.click(); } });

/* ══════════════════════════════════════════════════════════
   VIDEO MODAL (YouTube IFrame API — enables progress tracking,
   and — when opened from a Show's episode list — autoplay-to-next
   plus Previous/Next Episode buttons)
══════════════════════════════════════════════════════════ */
var modal          = document.getElementById('modal');
var modalTitle      = document.getElementById('modal-title');
var modalYtLink     = document.getElementById('modal-yt-link');
var modalQueueNav   = document.getElementById('modal-queue-nav');
var modalPrevBtn    = document.getElementById('modal-prev-btn');
var modalNextBtn    = document.getElementById('modal-next-btn');
var modalQueuePos   = document.getElementById('modal-queue-position');
var ytPlayer        = null;
var ytApiReady      = false;
var pendingOpen     = null;
var currentVideoId  = null;
var progressTimer   = null;
var currentQueueList  = null; // array of {videoId, title} — only set for Show episode playback
var currentQueueIndex = -1;

function onYouTubeIframeAPIReady() {
  ytApiReady = true;
  if (pendingOpen) { var p = pendingOpen; pendingOpen = null; openModal(p.videoId, p.title, p.queue); }
}

function openModal(videoId, title, queueArr) {
  modalTitle.textContent = title;
  modal.classList.add('open');
  document.body.style.overflow = 'hidden';

  if (queueArr && queueArr.length) {
    currentQueueList = queueArr;
    currentQueueIndex = queueArr.findIndex(function(v) { return v.videoId === videoId; });
  } else {
    currentQueueList = null;
    currentQueueIndex = -1;
  }
  updateQueueNavUI();

  if (!ytApiReady) { pendingOpen = { videoId: videoId, title: title, queue: queueArr }; return; }

  currentVideoId = videoId;
  modalYtLink.href = 'https://youtu.be/' + videoId;
  var start = Math.floor(getProgress(videoId) || 0);

  if (ytPlayer && typeof ytPlayer.loadVideoById === 'function') {
    ytPlayer.loadVideoById({ videoId: videoId, startSeconds: start });
  } else {
    ytPlayer = new YT.Player('modal-iframe', {
      videoId: videoId,
      playerVars: { autoplay: 1, rel: 0, start: start, playsinline: 1 },
      events: {
        onReady: function(e){ e.target.playVideo(); },
        onStateChange: onPlayerStateChange
      }
    });
  }
  startProgressTracking();
}

function updateQueueNavUI() {
  if (!modalQueueNav) return;
  if (!currentQueueList || currentQueueIndex < 0) {
    modalQueueNav.classList.add('hidden');
    return;
  }
  modalQueueNav.classList.remove('hidden');
  modalPrevBtn.disabled = currentQueueIndex <= 0;
  modalNextBtn.disabled = currentQueueIndex >= currentQueueList.length - 1;
  modalQueuePos.textContent = 'Episode ' + (currentQueueIndex + 1) + ' of ' + currentQueueList.length;
}

function playQueueOffset(offset) {
  if (!currentQueueList) return false;
  var idx = currentQueueIndex + offset;
  if (idx < 0 || idx >= currentQueueList.length) return false;
  var next = currentQueueList[idx];
  openModal(next.videoId, next.title, currentQueueList);
  return true;
}

if (modalPrevBtn) modalPrevBtn.addEventListener('click', function() { playQueueOffset(-1); });
if (modalNextBtn) modalNextBtn.addEventListener('click', function() { playQueueOffset(1); });

function onPlayerStateChange(e) {
  if (!currentVideoId || typeof YT === 'undefined') return;
  if (e.data === YT.PlayerState.ENDED) {
    clearProgress(currentVideoId);
    playQueueOffset(1); // auto-advance to the next episode if this was a Show queue
  } else if (e.data === YT.PlayerState.PAUSED) {
    saveCurrentProgress();
  }
}

function saveCurrentProgress() {
  if (!ytPlayer || !currentVideoId || typeof ytPlayer.getCurrentTime !== 'function') return;
  try {
    var t = ytPlayer.getCurrentTime();
    var d = typeof ytPlayer.getDuration === 'function' ? ytPlayer.getDuration() : 0;
    if (d && t > d - 8) clearProgress(currentVideoId);
    else if (t > 4) setProgress(currentVideoId, t);
  } catch (err) { /* player not ready yet */ }
}
function startProgressTracking() { stopProgressTracking(); progressTimer = setInterval(saveCurrentProgress, 4000); }
function stopProgressTracking() { if (progressTimer) { clearInterval(progressTimer); progressTimer = null; } }

function closeModal() {
  modal.classList.remove('open');
  stopProgressTracking();
  saveCurrentProgress();
  if (ytPlayer && typeof ytPlayer.stopVideo === 'function') { try { ytPlayer.stopVideo(); } catch (err) {} }
  currentVideoId = null;
  pendingOpen = null;
  currentQueueList = null;
  currentQueueIndex = -1;
  document.body.style.overflow = '';
}

document.getElementById('modal-close').addEventListener('click', closeModal);
modal.addEventListener('click', function(e) { if (e.target === modal) closeModal(); });
document.addEventListener('keydown', function(e) { if (e.key === 'Escape') closeModal(); });

/* ══════════════════════════════════════════════════════════
   FULL PLAYLIST FETCH — pulls every video in a playlist (not just
   one page), used to build the autoplay/Previous/Next episode queue
   for Show pages. Paginates automatically using the API max page
   size, so most shows resolve in a single request.
══════════════════════════════════════════════════════════ */
function fetchFullPlaylist(playlistId, callback) {
  var all = [];
  function fetchPage(pageToken) {
    var url = 'https://www.googleapis.com/youtube/v3/playlistItems' +
      '?key=' + YT_API_KEY + '&playlistId=' + playlistId +
      '&part=snippet&maxResults=50' + (pageToken ? '&pageToken=' + pageToken : '');
    fetch(url).then(function(r) { return r.json(); }).then(function(data) {
      if (data.error) { callback(all); return; }
      (data.items || []).forEach(function(it) {
        if (it.snippet && it.snippet.resourceId && it.snippet.resourceId.videoId) {
          all.push({ videoId: it.snippet.resourceId.videoId, title: it.snippet.title });
        }
      });
      if (data.nextPageToken) fetchPage(data.nextPageToken);
      else callback(all);
    }).catch(function() { callback(all); });
  }
  fetchPage(null);
}

/* ══════════════════════════════════════════════════════════
   VIDEO CARD BUILDER
══════════════════════════════════════════════════════════ */
function buildCard(videoId, title, publishedAt, episodeQueue) {
  var date = publishedAt ? new Date(publishedAt).toLocaleDateString('en-US', { year:'numeric', month:'short', day:'numeric' }) : '';
  var thumb = 'https://img.youtube.com/vi/' + videoId + '/mqdefault.jpg';
  var safeTitle = title.replace(/"/g,'&quot;');
  var progress = getProgress(videoId);

  var card = document.createElement('div');
  card.className = 'video-card';

  var thumbWrap = document.createElement('div');
  thumbWrap.className = 'video-thumb-wrap';
  thumbWrap.innerHTML =
    '<img src="' + thumb + '" alt="' + safeTitle + '" loading="lazy">' +
    '<div class="play-overlay"><svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg></div>';

  var actions = document.createElement('div');
  actions.className = 'card-actions';

  var bookmarkBtn = document.createElement('button');
  bookmarkBtn.type = 'button';
  bookmarkBtn.className = 'card-action-btn bookmark-btn' + (isBookmarked(videoId) ? ' bookmarked' : '');
  bookmarkBtn.dataset.videoId = videoId;
  bookmarkBtn.title = 'Bookmark';
  bookmarkBtn.innerHTML = '<svg viewBox="0 0 24 24"><path d="M6 3h12a1 1 0 0 1 1 1v17l-7-4-7 4V4a1 1 0 0 1 1-1z"/></svg>';
  bookmarkBtn.addEventListener('click', function(e) {
    e.stopPropagation();
    if (!requireLogin()) return;
    toggleBookmark(videoId, { videoId: videoId, title: title, publishedAt: publishedAt });
  });

  var playlistBtn = document.createElement('button');
  playlistBtn.type = 'button';
  playlistBtn.className = 'card-action-btn playlist-btn';
  playlistBtn.title = 'Add to playlist';
  playlistBtn.innerHTML = '<svg viewBox="0 0 24 24"><path d="M12 5v14M5 12h14"/></svg>';
  playlistBtn.addEventListener('click', function(e) {
    e.stopPropagation();
    if (!requireLogin()) return;
    openPlaylistModal(videoId, { videoId: videoId, title: title, publishedAt: publishedAt });
  });

  actions.appendChild(bookmarkBtn);
  actions.appendChild(playlistBtn);

  var meta = document.createElement('div');
  meta.className = 'video-meta';
  meta.innerHTML =
    '<div class="video-title-text">' + title + '</div>' +
    (date ? '<div class="video-date">' + date + '</div>' : '') +
    (progress > 4 ? '<div class="resume-badge">\u25b6 Resume at ' + formatTime(progress) + '</div>' : '');

  card.appendChild(thumbWrap);
  card.appendChild(actions);
  card.appendChild(meta);
  card.addEventListener('click', function() { openModal(videoId, title, episodeQueue); });
  return card;
}

/* ══════════════════════════════════════════════════════════
   POSTER CARD BUILDER (homepage Shows/Channels grids)
══════════════════════════════════════════════════════════ */
function buildPosterCard(item, type) {
  // item: { id (slug), name, handle, logo, poster }
  var a = document.createElement('a');
  a.className = 'poster-card';
  a.href = '/Show/?type=' + type + '&id=' + encodeURIComponent(item.id);

  var artWrap = document.createElement('div');
  artWrap.className = 'poster-art-wrap';
  var img = document.createElement('img');
  img.loading = 'lazy';
  img.alt = item.name;
  img.src = item.poster || item.logo;
  img.addEventListener('error', function() {
    if (img.dataset.fallenBack) return;
    img.dataset.fallenBack = '1';
    artWrap.classList.add('fallback');
    img.src = item.logo;
  });
  artWrap.appendChild(img);

  var fade = document.createElement('div');
  fade.className = 'poster-fade';
  artWrap.appendChild(fade);

  var label = document.createElement('div');
  label.className = 'poster-label';
  label.innerHTML = '<div class="poster-name">' + item.name + '</div>' + (item.handle ? '<div class="poster-handle">' + item.handle + '</div>' : '');
  artWrap.appendChild(label);

  var bookmarkBtn = document.createElement('button');
  bookmarkBtn.type = 'button';
  bookmarkBtn.className = 'poster-bookmark-btn show-bookmark-target' + (isShowBookmarked(item.id) ? ' bookmarked' : '');
  bookmarkBtn.dataset.showId = item.id;
  bookmarkBtn.title = 'Bookmark this ' + (type === 'show' ? 'show' : 'channel');
  bookmarkBtn.innerHTML = '<svg viewBox="0 0 24 24"><path d="M6 3h12a1 1 0 0 1 1 1v17l-7-4-7 4V4a1 1 0 0 1 1-1z"/></svg>';
  bookmarkBtn.addEventListener('click', function(e) {
    e.preventDefault(); e.stopPropagation();
    if (!requireLogin()) return;
    toggleShowBookmark(item.id, { id: item.id, type: type, name: item.name, handle: item.handle || null, logo: item.logo, poster: item.poster || null });
  });

  a.appendChild(artWrap);
  a.appendChild(bookmarkBtn);
  return a;
}

/* ══════════════════════════════════════════════════════════
   NETFLIX-STYLE HORIZONTAL ROW (poster cards)
   Used for Original Shows / Channels / bookmarked shows.
══════════════════════════════════════════════════════════ */
function buildPosterRow(title, items, type) {
  var row = document.createElement('div');
  row.className = 'netflix-row';

  if (title) {
    var h = document.createElement('div');
    h.className = 'netflix-row-title';
    h.textContent = title;
    row.appendChild(h);
  }

  var outer = document.createElement('div');
  outer.className = 'netflix-row-outer';

  var scroll = document.createElement('div');
  scroll.className = 'netflix-scroll';

  if (!items.length) {
    var empty = document.createElement('div');
    empty.className = 'empty-state';
    empty.textContent = 'Nothing here yet.';
    outer.appendChild(empty);
    row.appendChild(outer);
    return row;
  }

  items.forEach(function(item) {
    scroll.appendChild(buildPosterCard(item, item.type || type));
  });

  var prevBtn = document.createElement('button');
  prevBtn.type = 'button'; prevBtn.className = 'netflix-scroll-btn prev'; prevBtn.setAttribute('aria-label', 'Scroll left');
  prevBtn.innerHTML = '<svg viewBox="0 0 24 24"><path d="M15 18l-6-6 6-6"/></svg>';
  var nextBtn = document.createElement('button');
  nextBtn.type = 'button'; nextBtn.className = 'netflix-scroll-btn next'; nextBtn.setAttribute('aria-label', 'Scroll right');
  nextBtn.innerHTML = '<svg viewBox="0 0 24 24"><path d="M9 18l6-6-6-6"/></svg>';
  prevBtn.addEventListener('click', function(){ scroll.scrollBy({ left: -520, behavior: 'smooth' }); });
  nextBtn.addEventListener('click', function(){ scroll.scrollBy({ left: 520, behavior: 'smooth' }); });

  outer.appendChild(scroll);
  outer.appendChild(prevBtn);
  outer.appendChild(nextBtn);
  row.appendChild(outer);
  return row;
}

/* ══════════════════════════════════════════════════════════
   CENTERED POSTER ROW — for small fixed-size sets (e.g. the 5-item
   "Recommended Today" row) where a left-aligned scrolling strip would
   look lopsided. Wraps instead of scrolling, and centers as a block.
══════════════════════════════════════════════════════════ */
function buildCenteredPosterRow(title, items, type) {
  var row = document.createElement('div');
  row.className = 'netflix-row';

  if (title) {
    var h = document.createElement('div');
    h.className = 'netflix-row-title';
    h.textContent = title;
    row.appendChild(h);
  }

  var grid = document.createElement('div');
  grid.className = 'centered-poster-row';

  if (!items.length) {
    var empty = document.createElement('div');
    empty.className = 'empty-state';
    empty.textContent = 'Nothing here yet.';
    row.appendChild(empty);
    return row;
  }

  items.forEach(function(item) {
    grid.appendChild(buildPosterCard(item, item.type || type));
  });

  row.appendChild(grid);
  return row;
}

/* ══════════════════════════════════════════════════════════
   DAILY RECOMMENDATIONS (homepage "Recommended Today" row)
   Deterministic per calendar day — same picks for every visitor
   until the date changes, rather than reshuffling on every load.
   5 total: 3 shows + 2 channels.
══════════════════════════════════════════════════════════ */
function seededRandom(seed) {
  // mulberry32 — small, fast, deterministic PRNG
  return function() {
    seed |= 0; seed = (seed + 0x6D2B79F5) | 0;
    var t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
function shuffleWithRandom(arr, rand) {
  var a = arr.slice();
  for (var i = a.length - 1; i > 0; i--) {
    var j = Math.floor(rand() * (i + 1));
    var tmp = a[i]; a[i] = a[j]; a[j] = tmp;
  }
  return a;
}
function getDailyRecommendations() {
  var today = new Date();
  var seed = today.getFullYear() * 10000 + (today.getMonth() + 1) * 100 + today.getDate();
  var rand = seededRandom(seed);

  var showCount = Math.min(3, SHOWS.length);
  var channelCount = Math.min(2, CHANNELS.length);
  var pickedShows = shuffleWithRandom(SHOWS, rand).slice(0, showCount)
    .map(function(s) { return { id: s.slug, name: s.name, handle: null, logo: s.logo, poster: s.poster, type: 'show' }; });
  var pickedChannels = shuffleWithRandom(CHANNELS, rand).slice(0, channelCount)
    .map(function(c) { return { id: c.slug, name: c.name, handle: c.handle, logo: c.logo, poster: c.poster, type: 'channel' }; });

  return shuffleWithRandom(pickedShows.concat(pickedChannels), rand);
}

/* ══════════════════════════════════════════════════════════
   SECTION BUILDER
══════════════════════════════════════════════════════════ */
function buildSection(name, handle, ytUrl, tab, opts) {
  opts = opts || {};
  var section = document.createElement('div');
  section.className = 'stream-section';
  section.dataset.tab = tab;

  var header = document.createElement('div');
  header.className = 'section-header';
  header.innerHTML =
    '<span class="section-title">' + name + '</span>' +
    (handle ? '<span class="section-handle">' + handle + '</span>' : '') +
    (ytUrl  ? '<a class="section-link" href="' + ytUrl + '" target="_blank" rel="noopener noreferrer">View on YouTube \u2197</a>' : '');

  if (opts.onDelete) {
    var delBtn = document.createElement('button');
    delBtn.type = 'button';
    delBtn.className = 'section-delete-btn';
    delBtn.textContent = 'Delete playlist';
    delBtn.addEventListener('click', opts.onDelete);
    header.appendChild(delBtn);
  }

  var grid = document.createElement('div');
  grid.className = 'video-grid';

  var loading = document.createElement('div');
  loading.className = 'section-loading';
  loading.innerHTML = '<div class="spinner"></div> Loading videos…';

  section.appendChild(header);
  section.appendChild(loading);
  section.appendChild(grid);
  return { section: section, grid: grid, loading: loading };
}

/* ══════════════════════════════════════════════════════════
   PAGINATION — shared by API sections and local sections
   (Bookmarks / My Playlists / show & channel detail pages)
══════════════════════════════════════════════════════════ */
function setupPagedSection(built, loadPage, emptyMessage, episodeQueue) {
  var tokens = [null];
  var index = 0;

  var bar = document.createElement('div');
  bar.className = 'pagination-bar';
  bar.style.display = 'none';
  var prevBtn = document.createElement('button');
  prevBtn.type = 'button'; prevBtn.className = 'page-btn'; prevBtn.textContent = '\u2039 Prev';
  var indicator = document.createElement('span');
  indicator.className = 'page-indicator';
  var nextBtn = document.createElement('button');
  nextBtn.type = 'button'; nextBtn.className = 'page-btn'; nextBtn.textContent = 'Next \u203a';
  bar.appendChild(prevBtn); bar.appendChild(indicator); bar.appendChild(nextBtn);
  built.section.appendChild(bar);

  function render() {
    built.loading.style.display = 'flex';
    built.loading.innerHTML = '<div class="spinner"></div> Loading videos…';
    built.grid.innerHTML = '';
    loadPage(tokens[index], function(items, nextToken, error) {
      built.loading.style.display = 'none';
      built.grid.innerHTML = '';
      if (error) {
        built.grid.innerHTML = '<div class="section-error">' + error + '</div>';
        bar.style.display = 'none';
        return;
      }
      if (!items.length && index === 0) {
        built.grid.innerHTML = '<div class="empty-state">' + emptyMessage + '</div>';
        bar.style.display = 'none';
        return;
      }
      items.forEach(function(v) { built.grid.appendChild(buildCard(v.videoId, v.title, v.publishedAt, episodeQueue)); });
      if (nextToken) {
        if (tokens.length === index + 1) tokens.push(nextToken); else tokens[index + 1] = nextToken;
      }
      var hasNext = !!nextToken;
      var hasPrev = index > 0;
      bar.style.display = (hasNext || hasPrev) ? 'flex' : 'none';
      prevBtn.disabled = !hasPrev;
      nextBtn.disabled = !hasNext;
      indicator.textContent = 'Page ' + (index + 1);
    });
  }

  prevBtn.addEventListener('click', function() { if (index > 0) { index--; render(); } });
  nextBtn.addEventListener('click', function() { if (tokens[index + 1] !== undefined) { index++; render(); } });

  render();
}

function channelLoader(channelId) {
  return function(pageToken, cb) {
    var url = 'https://www.googleapis.com/youtube/v3/search' +
      '?key=' + YT_API_KEY + '&channelId=' + channelId +
      '&part=snippet,id&order=date&maxResults=' + MAX_RESULTS + '&type=video' +
      (pageToken ? '&pageToken=' + pageToken : '');
    fetch(url).then(function(r){ return r.json(); }).then(function(data) {
      if (data.error) { cb([], null, 'Could not load videos — check your API key and channel ID.'); return; }
      var items = (data.items || []).filter(function(it){ return it.id && it.id.videoId; })
        .map(function(it){ return { videoId: it.id.videoId, title: it.snippet.title, publishedAt: it.snippet.publishedAt }; });
      cb(items, data.nextPageToken || null, null);
    }).catch(function(){ cb([], null, 'Could not load videos — check your API key and channel ID.'); });
  };
}
function playlistLoader(playlistId) {
  return function(pageToken, cb) {
    var url = 'https://www.googleapis.com/youtube/v3/playlistItems' +
      '?key=' + YT_API_KEY + '&playlistId=' + playlistId +
      '&part=snippet&maxResults=' + MAX_RESULTS +
      (pageToken ? '&pageToken=' + pageToken : '');
    fetch(url).then(function(r){ return r.json(); }).then(function(data) {
      if (data.error) { cb([], null, 'Could not load playlist — check your API key and playlist ID.'); return; }
      var items = (data.items || []).filter(function(it){ return it.snippet && it.snippet.resourceId && it.snippet.resourceId.videoId; })
        .map(function(it){ return { videoId: it.snippet.resourceId.videoId, title: it.snippet.title, publishedAt: it.snippet.publishedAt }; });
      cb(items, data.nextPageToken || null, null);
    }).catch(function(){ cb([], null, 'Could not load playlist — check your API key and playlist ID.'); });
  };
}
function localLoader(itemsArray) {
  return function(pageToken, cb) {
    var idx = pageToken ? parseInt(pageToken, 10) : 0;
    var start = idx * MAX_RESULTS;
    var pageItems = itemsArray.slice(start, start + MAX_RESULTS);
    var next = (start + MAX_RESULTS) < itemsArray.length ? String(idx + 1) : null;
    cb(pageItems, next, null);
  };
}
