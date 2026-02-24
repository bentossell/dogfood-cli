# Dogfood Report

- **Target:** https://bensbites.com/cookbook
- **Started:** 2026-02-24T23:16:14.312Z
- **Finished:** 2026-02-24T23:16:33.492Z

## Summary

- Pages visited: **1**
- Critical errors: **0**
- Warnings: **25**
- Info findings: **1**

## Per-page breakdown

### 1. Ben's Bites | Ben Tossell | Substack  
https://www.bensbites.com/cookbook

- Depth: 0
- Load time: 1726ms
- Screenshot: screenshots/001-www-bensbites-com-cookbook.png
- Discovered links: 0

**Actions taken**
- [x] navigation: Loaded https://bensbites.com/cookbook in 1726ms
- [x] click (button:#1): Clicked button
- [ ] click (button#2): Failed click: locator.click: Timeout 1500ms exceeded.
Call log:
  - waiting for locator('button').nth(1)
    - locator resolved to <button tabindex="0" type="button" id="radix-P0-785" data-state="closed" aria-haspopup="menu" aria-expanded="false" aria-label="Share Publication" class="pencraft pc-reset pencraft iconButton-mq_Et5 iconButtonBase-dJGHgN buttonBase-GK1x3M buttonStyle-r7yGCK size_md-gCDS3o priority_tertiary-rlke8z">…</button>
  - attempting click action
    2 × waiting for element to be visible, enabled and stable
      - element is visible, enabled and stable
      - scrolling into view if needed
      - done scrolling
      - <div data-state="open" class="backdrop-IqiELY"></div> from <div>…</div> subtree intercepts pointer events
    - retrying click action
    - waiting 20ms
    2 × waiting for element to be visible, enabled and stable
      - element is visible, enabled and stable
      - scrolling into view if needed
      - done scrolling
      - <div data-state="open" class="backdrop-IqiELY"></div> from <div>…</div> subtree intercepts pointer events
    - retrying click action
      - waiting 100ms
    - waiting for element to be visible, enabled and stable
    - element is visible, enabled and stable
    - scrolling into view if needed
    - done scrolling
    - <div data-state="open" class="backdrop-IqiELY"></div> from <div>…</div> subtree intercepts pointer events
  - retrying click action
    - waiting 500ms

- [ ] click (button#3): Failed click: locator.click: Timeout 1500ms exceeded.
Call log:
  - waiting for locator('button').nth(2)
    - locator resolved to <button tabindex="0" type="button" data-testid="noncontributor-cta-button" class="pencraft pc-reset pencraft buttonBase-GK1x3M buttonText-X0uSmG buttonStyle-r7yGCK priority_primary-RfbeYt size_md-gCDS3o">Subscribe</button>
  - attempting click action
    2 × waiting for element to be visible, enabled and stable
      - element is visible, enabled and stable
      - scrolling into view if needed
      - done scrolling
      - <div data-state="open" class="backdrop-IqiELY"></div> from <div>…</div> subtree intercepts pointer events
    - retrying click action
    - waiting 20ms
    2 × waiting for element to be visible, enabled and stable
      - element is visible, enabled and stable
      - scrolling into view if needed
      - done scrolling
      - <div data-state="open" class="backdrop-IqiELY"></div> from <div>…</div> subtree intercepts pointer events
    - retrying click action
      - waiting 100ms
    2 × waiting for element to be visible, enabled and stable
      - element is visible, enabled and stable
      - scrolling into view if needed
      - done scrolling
      - <div data-state="open" class="backdrop-IqiELY"></div> from <div>…</div> subtree intercepts pointer events
    - retrying click action
      - waiting 500ms

- [ ] click (button#5): Failed click: locator.click: Timeout 1500ms exceeded.
Call log:
  - waiting for locator('button').nth(4)
    - locator resolved to <button role="tab" type="button" tabindex="-1" data-state="active" aria-selected="true" id="radix-P0-9-trigger-new" data-orientation="horizontal" data-radix-collection-item="" aria-controls="radix-P0-9-content-new" class="pencraft pc-reset flex-auto-j3S2WA pencraft segment-j4TeZ4 buttonBase-GK1x3M buttonText-X0uSmG buttonStyle-r7yGCK priority_quaternary-kpMibu size_sm-G3LciD">Latest</button>
  - attempting click action
    2 × waiting for element to be visible, enabled and stable
      - element is visible, enabled and stable
      - scrolling into view if needed
      - done scrolling
      - <img width="40" height="40" sizes="40px" draggable="false" alt="Shanice Stewart-Jones's avatar" class="img-OACg1c object-fit-cover-u4ReeV pencraft pc-reset" src="https://substackcdn.com/image/fetch/$s_!AGtv!,w_40,h_40,c_fill,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fee7f941a-8b64-4414-b803-5595e63f760b_799x799.jpeg" srcset="https://substackcdn.com/image/fetch/$s_!AGtv!,w_40,h_40,c_fill,f_auto,q_auto:good,fl_progressive:steep/https…/> from <div>…</div> subtree intercepts pointer events
    - retrying click action
    - waiting 20ms
    - waiting for element to be visible, enabled and stable
    - element is visible, enabled and stable
    - scrolling into view if needed
    - done scrolling
    - <img width="40" height="40" sizes="40px" draggable="false" alt="Shanice Stewart-Jones's avatar" class="img-OACg1c object-fit-cover-u4ReeV pencraft pc-reset" src="https://substackcdn.com/image/fetch/$s_!AGtv!,w_40,h_40,c_fill,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fee7f941a-8b64-4414-b803-5595e63f760b_799x799.jpeg" srcset="https://substackcdn.com/image/fetch/$s_!AGtv!,w_40,h_40,c_fill,f_auto,q_auto:good,fl_progressive:steep/https…/> from <div>…</div> subtree intercepts pointer events
  2 × retrying click action
      - waiting 100ms
      - waiting for element to be visible, enabled and stable
      - element is visible, enabled and stable
      - scrolling into view if needed
      - done scrolling
      - <div data-state="open" class="backdrop-IqiELY"></div> from <div>…</div> subtree intercepts pointer events
  - retrying click action
    - waiting 500ms
    - waiting for element to be visible, enabled and stable

- [x] discovery: Discovered 0 same-origin links

**Issues**
- **WARNING** [console-error] Failed to load resource: the server responded with a status of 404 ()
  - Screenshot: screenshots/001-www-bensbites-com-cookbook-issue-1.png
- **WARNING** [http-failure] GET https://substack.com/fedcm/accounts failed: net::ERR_HTTP_RESPONSE_CODE_FAILURE
  - Screenshot: screenshots/001-www-bensbites-com-cookbook-issue-2.png
- **WARNING** [console-error] When fetching the accounts endpoint, a 401 HTTP response code was received.
  - Screenshot: screenshots/001-www-bensbites-com-cookbook-issue-3.png
- **WARNING** [console-error] The provider's accounts list fetch resulted in an error response code.
  - Screenshot: screenshots/001-www-bensbites-com-cookbook-issue-4.png
- **WARNING** [http-failure] GET https://substackcdn.com/image/fetch/$s_!2jgc!,w_150,h_150,c_fill,f_webp,q_auto:good,fl_progressive:steep,g_auto/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fda16bfb0-66e5-4ebc-8ca9-14a7d129fbe4_1550x924.png failed: net::ERR_ABORTED
  - Screenshot: screenshots/001-www-bensbites-com-cookbook-issue-5.png
- **WARNING** [http-failure] GET https://substackcdn.com/image/fetch/$s_!G_td!,w_150,h_150,c_fill,f_webp,q_auto:good,fl_progressive:steep,g_auto/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fd99b2aa8-a8d3-4511-a388-fd37bc878298_2752x1536.jpeg failed: net::ERR_ABORTED
  - Screenshot: screenshots/001-www-bensbites-com-cookbook-issue-6.png
- **WARNING** [http-failure] GET https://substackcdn.com/image/fetch/$s_!w5fm!,w_150,h_150,c_fill,f_webp,q_auto:good,fl_progressive:steep,g_auto/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F10088ce0-c8e6-41ce-8242-d0fe15b67d9e_1456x808.png failed: net::ERR_ABORTED
  - Screenshot: screenshots/001-www-bensbites-com-cookbook-issue-7.png
- **WARNING** [http-failure] GET https://substackcdn.com/image/fetch/$s_!vN64!,w_150,h_150,c_fill,f_webp,q_auto:good,fl_progressive:steep,g_auto/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fdce8bef0-e2a4-4675-9600-e10a7891f224_1668x942.png failed: net::ERR_ABORTED
  - Screenshot: screenshots/001-www-bensbites-com-cookbook-issue-8.png
- **WARNING** [http-failure] GET https://substackcdn.com/image/fetch/$s_!gS7I!,w_150,h_150,c_fill,f_webp,q_auto:good,fl_progressive:steep,g_auto/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Ff463d09f-9d80-46ed-a22c-07f6f70ac8ed_1794x1016.png failed: net::ERR_ABORTED
  - Screenshot: screenshots/001-www-bensbites-com-cookbook-issue-9.png
- **WARNING** [http-failure] GET https://substackcdn.com/image/fetch/$s_!u3J5!,w_150,h_150,c_fill,f_webp,q_auto:good,fl_progressive:steep,g_auto/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F76395fee-4bbb-483f-965d-6fb80cd666f6_711x400.jpeg failed: net::ERR_ABORTED
  - Screenshot: screenshots/001-www-bensbites-com-cookbook-issue-10.png
- **WARNING** [http-failure] GET https://substackcdn.com/image/fetch/$s_!Uy0g!,w_150,h_150,c_fill,f_webp,q_auto:good,fl_progressive:steep,g_auto/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F1b0b3843-a5bc-49cc-bd39-3439bb53fc97_1398x818.png failed: net::ERR_ABORTED
  - Screenshot: screenshots/001-www-bensbites-com-cookbook-issue-11.png
- **WARNING** [http-failure] GET https://substackcdn.com/image/fetch/$s_!mrJP!,w_150,h_150,c_fill,f_webp,q_auto:good,fl_progressive:steep,g_auto/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F12242c73-0a49-4855-a021-a224466a37b4_1444x915.png failed: net::ERR_ABORTED
  - Screenshot: screenshots/001-www-bensbites-com-cookbook-issue-12.png
- **WARNING** [http-failure] GET https://substackcdn.com/image/fetch/$s_!yXro!,w_150,h_150,c_fill,f_webp,q_auto:good,fl_progressive:steep,g_auto/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fa276c43f-745d-461b-9059-210422571b0e_1024x559.png failed: net::ERR_ABORTED
  - Screenshot: screenshots/001-www-bensbites-com-cookbook-issue-13.png
- **WARNING** [http-failure] GET https://substackcdn.com/image/fetch/$s_!1RuM!,w_150,h_150,c_fill,f_webp,q_auto:good,fl_progressive:steep,g_auto/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Ff98e8be3-6106-48b4-8339-b2b9f432908d_1024x523.png failed: net::ERR_ABORTED
  - Screenshot: screenshots/001-www-bensbites-com-cookbook-issue-14.png
- **WARNING** [http-failure] GET https://substackcdn.com/image/fetch/$s_!jP1g!,w_150,h_150,c_fill,f_webp,q_auto:good,fl_progressive:steep,g_auto/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F7339a030-293b-414c-bab7-ac8b41b8ec0b_1000x558.jpeg failed: net::ERR_ABORTED
  - Screenshot: screenshots/001-www-bensbites-com-cookbook-issue-15.png
- **WARNING** [http-failure] GET https://substackcdn.com/image/fetch/$s_!98bv!,w_150,h_150,c_fill,f_webp,q_auto:good,fl_progressive:steep,g_auto/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F2fbbb31b-9d6c-42ab-87a5-d4509f0c002c_1024x617.png failed: net::ERR_ABORTED
  - Screenshot: screenshots/001-www-bensbites-com-cookbook-issue-16.png
- **WARNING** [http-failure] GET https://substackcdn.com/image/fetch/$s_!teJ7!,w_150,h_150,c_fill,f_webp,q_auto:good,fl_progressive:steep,g_auto/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Ff027ef27-bd63-4273-9597-2aaed7c2f935_2048x1450.png failed: net::ERR_ABORTED
  - Screenshot: screenshots/001-www-bensbites-com-cookbook-issue-17.png
- **WARNING** [http-failure] GET https://substackcdn.com/image/fetch/$s_!HWEJ!,w_150,h_150,c_fill,f_webp,q_auto:good,fl_progressive:steep,g_auto/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F9e8fbcbe-eb4d-4176-a1b3-0ad442b9f84c_2752x1536.png failed: net::ERR_ABORTED
  - Screenshot: screenshots/001-www-bensbites-com-cookbook-issue-18.png
- **INFO** [missing-alt] 23 image(s) missing alt text
  - Screenshot: screenshots/001-www-bensbites-com-cookbook-issue-19.png
- **WARNING** [http-failure] GET https://substackcdn.com/image/fetch/$s_!EvUj!,w_150,h_150,c_fill,f_webp,q_auto:good,fl_progressive:steep,g_auto/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F523f99c3-5112-45ef-84cf-0a035e8a4558_1454x876.png failed: net::ERR_ABORTED
  - Screenshot: screenshots/001-www-bensbites-com-cookbook-issue-20.png
- **WARNING** [http-failure] GET https://substackcdn.com/image/fetch/$s_!v09b!,w_150,h_150,c_fill,f_webp,q_auto:good,fl_progressive:steep,g_auto/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F6cc66668-1f4e-4a2e-abec-17e22bd1d614_1458x956.png failed: net::ERR_ABORTED
  - Screenshot: screenshots/001-www-bensbites-com-cookbook-issue-21.png
- **WARNING** [http-failure] GET https://substackcdn.com/image/fetch/$s_!uF1j!,w_150,h_150,c_fill,f_webp,q_auto:good,fl_progressive:steep,g_auto/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fd04c48bb-766b-4538-beaa-49c989cf50d4_2116x1254.png failed: net::ERR_ABORTED
  - Screenshot: screenshots/001-www-bensbites-com-cookbook-issue-22.png
- **WARNING** [http-failure] GET https://substackcdn.com/image/fetch/$s_!tpyw!,w_150,h_150,c_fill,f_webp,q_auto:good,fl_progressive:steep,g_auto/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F17808b92-fcc1-4fef-a694-df338a77e519_2816x1536.png failed: net::ERR_ABORTED
  - Screenshot: screenshots/001-www-bensbites-com-cookbook-issue-23.png
- **WARNING** [http-failure] GET https://substackcdn.com/image/fetch/$s_!bz8T!,w_150,h_150,c_fill,f_webp,q_auto:good,fl_progressive:steep,g_auto/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fcae24c17-24b1-41cc-ae89-36fae16e2e0d_2326x1212.png failed: net::ERR_ABORTED
  - Screenshot: screenshots/001-www-bensbites-com-cookbook-issue-24.png
- **WARNING** [http-failure] GET https://substackcdn.com/image/fetch/$s_!-alz!,w_150,h_150,c_fill,f_webp,q_auto:good,fl_progressive:steep,g_auto/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Ff13b5f28-285c-4817-bdb1-696b7c760247_2784x1536.png failed: net::ERR_ABORTED
  - Screenshot: screenshots/001-www-bensbites-com-cookbook-issue-25.png
- **WARNING** [http-failure] GET https://substackcdn.com/image/fetch/$s_!FEYM!,w_150,h_150,c_fill,f_webp,q_auto:good,fl_progressive:steep,g_auto/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F16ff84ea-eb6a-4496-97eb-19b083339980_1376x768.jpeg failed: net::ERR_ABORTED
  - Screenshot: screenshots/001-www-bensbites-com-cookbook-issue-26.png

## All issues

- **WARNING** https://www.bensbites.com/cookbook — console-error: Failed to load resource: the server responded with a status of 404 ()
- **WARNING** https://www.bensbites.com/cookbook — http-failure: GET https://substack.com/fedcm/accounts failed: net::ERR_HTTP_RESPONSE_CODE_FAILURE
- **WARNING** https://www.bensbites.com/cookbook — console-error: When fetching the accounts endpoint, a 401 HTTP response code was received.
- **WARNING** https://www.bensbites.com/cookbook — console-error: The provider's accounts list fetch resulted in an error response code.
- **WARNING** https://www.bensbites.com/cookbook — http-failure: GET https://substackcdn.com/image/fetch/$s_!2jgc!,w_150,h_150,c_fill,f_webp,q_auto:good,fl_progressive:steep,g_auto/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fda16bfb0-66e5-4ebc-8ca9-14a7d129fbe4_1550x924.png failed: net::ERR_ABORTED
- **WARNING** https://www.bensbites.com/cookbook — http-failure: GET https://substackcdn.com/image/fetch/$s_!G_td!,w_150,h_150,c_fill,f_webp,q_auto:good,fl_progressive:steep,g_auto/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fd99b2aa8-a8d3-4511-a388-fd37bc878298_2752x1536.jpeg failed: net::ERR_ABORTED
- **WARNING** https://www.bensbites.com/cookbook — http-failure: GET https://substackcdn.com/image/fetch/$s_!w5fm!,w_150,h_150,c_fill,f_webp,q_auto:good,fl_progressive:steep,g_auto/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F10088ce0-c8e6-41ce-8242-d0fe15b67d9e_1456x808.png failed: net::ERR_ABORTED
- **WARNING** https://www.bensbites.com/cookbook — http-failure: GET https://substackcdn.com/image/fetch/$s_!vN64!,w_150,h_150,c_fill,f_webp,q_auto:good,fl_progressive:steep,g_auto/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fdce8bef0-e2a4-4675-9600-e10a7891f224_1668x942.png failed: net::ERR_ABORTED
- **WARNING** https://www.bensbites.com/cookbook — http-failure: GET https://substackcdn.com/image/fetch/$s_!gS7I!,w_150,h_150,c_fill,f_webp,q_auto:good,fl_progressive:steep,g_auto/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Ff463d09f-9d80-46ed-a22c-07f6f70ac8ed_1794x1016.png failed: net::ERR_ABORTED
- **WARNING** https://www.bensbites.com/cookbook — http-failure: GET https://substackcdn.com/image/fetch/$s_!u3J5!,w_150,h_150,c_fill,f_webp,q_auto:good,fl_progressive:steep,g_auto/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F76395fee-4bbb-483f-965d-6fb80cd666f6_711x400.jpeg failed: net::ERR_ABORTED
- **WARNING** https://www.bensbites.com/cookbook — http-failure: GET https://substackcdn.com/image/fetch/$s_!Uy0g!,w_150,h_150,c_fill,f_webp,q_auto:good,fl_progressive:steep,g_auto/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F1b0b3843-a5bc-49cc-bd39-3439bb53fc97_1398x818.png failed: net::ERR_ABORTED
- **WARNING** https://www.bensbites.com/cookbook — http-failure: GET https://substackcdn.com/image/fetch/$s_!mrJP!,w_150,h_150,c_fill,f_webp,q_auto:good,fl_progressive:steep,g_auto/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F12242c73-0a49-4855-a021-a224466a37b4_1444x915.png failed: net::ERR_ABORTED
- **WARNING** https://www.bensbites.com/cookbook — http-failure: GET https://substackcdn.com/image/fetch/$s_!yXro!,w_150,h_150,c_fill,f_webp,q_auto:good,fl_progressive:steep,g_auto/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fa276c43f-745d-461b-9059-210422571b0e_1024x559.png failed: net::ERR_ABORTED
- **WARNING** https://www.bensbites.com/cookbook — http-failure: GET https://substackcdn.com/image/fetch/$s_!1RuM!,w_150,h_150,c_fill,f_webp,q_auto:good,fl_progressive:steep,g_auto/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Ff98e8be3-6106-48b4-8339-b2b9f432908d_1024x523.png failed: net::ERR_ABORTED
- **WARNING** https://www.bensbites.com/cookbook — http-failure: GET https://substackcdn.com/image/fetch/$s_!jP1g!,w_150,h_150,c_fill,f_webp,q_auto:good,fl_progressive:steep,g_auto/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F7339a030-293b-414c-bab7-ac8b41b8ec0b_1000x558.jpeg failed: net::ERR_ABORTED
- **WARNING** https://www.bensbites.com/cookbook — http-failure: GET https://substackcdn.com/image/fetch/$s_!98bv!,w_150,h_150,c_fill,f_webp,q_auto:good,fl_progressive:steep,g_auto/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F2fbbb31b-9d6c-42ab-87a5-d4509f0c002c_1024x617.png failed: net::ERR_ABORTED
- **WARNING** https://www.bensbites.com/cookbook — http-failure: GET https://substackcdn.com/image/fetch/$s_!teJ7!,w_150,h_150,c_fill,f_webp,q_auto:good,fl_progressive:steep,g_auto/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Ff027ef27-bd63-4273-9597-2aaed7c2f935_2048x1450.png failed: net::ERR_ABORTED
- **WARNING** https://www.bensbites.com/cookbook — http-failure: GET https://substackcdn.com/image/fetch/$s_!HWEJ!,w_150,h_150,c_fill,f_webp,q_auto:good,fl_progressive:steep,g_auto/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F9e8fbcbe-eb4d-4176-a1b3-0ad442b9f84c_2752x1536.png failed: net::ERR_ABORTED
- **INFO** https://www.bensbites.com/cookbook — missing-alt: 23 image(s) missing alt text
- **WARNING** https://www.bensbites.com/cookbook — http-failure: GET https://substackcdn.com/image/fetch/$s_!EvUj!,w_150,h_150,c_fill,f_webp,q_auto:good,fl_progressive:steep,g_auto/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F523f99c3-5112-45ef-84cf-0a035e8a4558_1454x876.png failed: net::ERR_ABORTED
- **WARNING** https://www.bensbites.com/cookbook — http-failure: GET https://substackcdn.com/image/fetch/$s_!v09b!,w_150,h_150,c_fill,f_webp,q_auto:good,fl_progressive:steep,g_auto/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F6cc66668-1f4e-4a2e-abec-17e22bd1d614_1458x956.png failed: net::ERR_ABORTED
- **WARNING** https://www.bensbites.com/cookbook — http-failure: GET https://substackcdn.com/image/fetch/$s_!uF1j!,w_150,h_150,c_fill,f_webp,q_auto:good,fl_progressive:steep,g_auto/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fd04c48bb-766b-4538-beaa-49c989cf50d4_2116x1254.png failed: net::ERR_ABORTED
- **WARNING** https://www.bensbites.com/cookbook — http-failure: GET https://substackcdn.com/image/fetch/$s_!tpyw!,w_150,h_150,c_fill,f_webp,q_auto:good,fl_progressive:steep,g_auto/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F17808b92-fcc1-4fef-a694-df338a77e519_2816x1536.png failed: net::ERR_ABORTED
- **WARNING** https://www.bensbites.com/cookbook — http-failure: GET https://substackcdn.com/image/fetch/$s_!bz8T!,w_150,h_150,c_fill,f_webp,q_auto:good,fl_progressive:steep,g_auto/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fcae24c17-24b1-41cc-ae89-36fae16e2e0d_2326x1212.png failed: net::ERR_ABORTED
- **WARNING** https://www.bensbites.com/cookbook — http-failure: GET https://substackcdn.com/image/fetch/$s_!-alz!,w_150,h_150,c_fill,f_webp,q_auto:good,fl_progressive:steep,g_auto/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Ff13b5f28-285c-4817-bdb1-696b7c760247_2784x1536.png failed: net::ERR_ABORTED
- **WARNING** https://www.bensbites.com/cookbook — http-failure: GET https://substackcdn.com/image/fetch/$s_!FEYM!,w_150,h_150,c_fill,f_webp,q_auto:good,fl_progressive:steep,g_auto/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F16ff84ea-eb6a-4496-97eb-19b083339980_1376x768.jpeg failed: net::ERR_ABORTED
