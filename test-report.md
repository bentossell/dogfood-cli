# Dogfood Report

- **Target:** https://bensbites.com/
- **Started:** 2026-02-24T23:15:59.691Z
- **Finished:** 2026-02-24T23:16:09.450Z

## Summary

- Pages visited: **1**
- Critical errors: **1**
- Warnings: **3**
- Info findings: **1**

## Per-page breakdown

### 1. Ben's Bites | Ben Tossell | Substack  
https://www.bensbites.com/

- Depth: 0
- Load time: 1088ms
- Screenshot: screenshots/001-www-bensbites-com.png
- Discovered links: 0

**Actions taken**
- [x] navigation: Loaded https://bensbites.com/ in 1088ms
- [x] click (button:#1): Clicked button
- [ ] click (button#2): Failed click: locator.click: Timeout 1500ms exceeded.
Call log:
  - waiting for locator('button').nth(1)
    - locator resolved to <button tabindex="0" type="button" id="radix-P0-4" data-state="closed" aria-haspopup="menu" aria-expanded="false" aria-label="Share Publication" class="pencraft pc-reset pencraft iconButton-mq_Et5 iconButtonBase-dJGHgN buttonBase-GK1x3M buttonStyle-r7yGCK size_md-gCDS3o priority_tertiary-rlke8z">…</button>
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
    - waiting for element to be visible, enabled and stable
    - element is visible, enabled and stable
    - scrolling into view if needed
    - done scrolling
    - <div data-state="open" class="backdrop-IqiELY"></div> from <div>…</div> subtree intercepts pointer events
  - retrying click action
    - waiting 500ms

- [ ] click (button#5): Failed click: locator.click: Timeout 1500ms exceeded.
Call log:
  - waiting for locator('button').nth(4)
    - locator resolved to <button tabindex="0" type="button" aria-pressed="false" aria-label="Like (57)" class="pencraft pc-reset pencraft post-ufi-button style-compressed has-label with-border">…</button>
  - attempting click action
    2 × waiting for element to be visible, enabled and stable
      - element is visible, enabled and stable
      - scrolling into view if needed
      - done scrolling
      - <div class="pencraft pc-display-flex pc-gap-4 pc-reset">…</div> from <div>…</div> subtree intercepts pointer events
    - retrying click action
    - waiting 20ms
    - waiting for element to be visible, enabled and stable
    - element is visible, enabled and stable
    - scrolling into view if needed
    - done scrolling
    - <div class="pencraft pc-display-flex pc-gap-12 pc-minWidth-0 pc-padding-8 pc-alignItems-center pc-reset flex-grow-rzmknG cursor-pointer-LYORKw pc-borderRadius-md row-YqulPz">…</div> from <div>…</div> subtree intercepts pointer events
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
    - element is visible, enabled and stable
    - scrolling into view if needed
    - done scrolling
    - <div class="pencraft pc-display-flex pc-gap-4 pc-reset">…</div> from <div>…</div> subtree intercepts pointer events
  - retrying click action
    - waiting 500ms

- [x] discovery: Discovered 0 same-origin links

**Issues**
- **INFO** [missing-alt] 16 image(s) missing alt text
  - Screenshot: screenshots/001-www-bensbites-com-issue-1.png
- **WARNING** [http-failure] GET https://substack.com/fedcm/accounts failed: net::ERR_HTTP_RESPONSE_CODE_FAILURE
  - Screenshot: screenshots/001-www-bensbites-com-issue-2.png
- **WARNING** [console-error] When fetching the accounts endpoint, a 401 HTTP response code was received.
  - Screenshot: screenshots/001-www-bensbites-com-issue-3.png
- **WARNING** [console-error] The provider's accounts list fetch resulted in an error response code.
  - Screenshot: screenshots/001-www-bensbites-com-issue-4.png
- **CRITICAL** [js-exception] Error retrieving a token.
  - Screenshot: screenshots/001-www-bensbites-com-issue-5.png

## All issues

- **INFO** https://www.bensbites.com/ — missing-alt: 16 image(s) missing alt text
- **WARNING** https://www.bensbites.com/ — http-failure: GET https://substack.com/fedcm/accounts failed: net::ERR_HTTP_RESPONSE_CODE_FAILURE
- **WARNING** https://www.bensbites.com/ — console-error: When fetching the accounts endpoint, a 401 HTTP response code was received.
- **WARNING** https://www.bensbites.com/ — console-error: The provider's accounts list fetch resulted in an error response code.
- **CRITICAL** https://www.bensbites.com/ — js-exception: Error retrieving a token.
