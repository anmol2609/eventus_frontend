# TODO
- [ ] DOwnload HTML + in the download part, only WHITELISTED artifacts should be downloaded.
- [ ] Search & Filter on TI Canvas will not work properly, since sections are individual now and it will search/filter on entire data not on individual sections
- [ ] Update Tooltip content in copy in ViewFeedEntryAndArtifacts.
- [ ] TI Canvas par back jaane se selectedView is reset. Try adding the selected view in url params.
- [ ] In ViewFeedEntryAndArtifacts & ViewFeedEntry pages, there is some margin in horizontal direction. Remove that, compare it with design you'll find (https://www.figma.com/proto/tAczXLbI69TY2KuMWE13iu/Eventus-platform?page-id=99%3A6022&node-id=99-8344&viewport=248%2C55%2C0.1&t=a4SDMr5Da0Mhnk0u-1&scaling=scale-down-width&content-scaling=fixed)
- [ ] Check TODO in entire codebase
- [ ] Make Left/right sections in inner pages sticky. (specially fro artifacts sections)

# TODO (LATER)
- [ ] Handle overflow in SOAR Products & Data Centers (description)
- [ ] Clear Filters option
- [ ] Create the V1_customer_product model in backend & frontend
- [ ] Those L0, L1, L2, L3 tenancy level changes.
- [ ] Pagination
- [ ] sort buttons on individual columns in table
- [ ] On adding filter, it is showing the _id column for those with reference to other tables

# DONE
- [x] Add validations in all forms
- [x] Filters not working properly
- [x] for update routes, dropdown is not getting pre-selected
- [x] The routes for AWS Customer has word customer while others have customers. Update the route for AWS Customer (All routes)
- [x] Add loader in Pages
- [x] Search functionality

# DO IT BUT ON LOW PRIORITY
- [ ] Search & Filters together are not working. Maybe I need to keep the searchTerm in params
- [ ] on mobile view, left menu bar needs to be clicked twice.
- [ ] Add the user info in Sidebar bottom
- [ ] Edit Pages par on success, turat redirect ho raha hai. Let it wait for 1 sec like on creation page
- [ ] Add date filter on created_at (in the last)
- [ ] SelectBox is filters has some issues. Ex - Select a value from dropdown & filter, then deselect the value and filter again. Result will not be as expected. (noticed with status dropdown in O365 customers)
- [ ] Some issue in search on artifacts page. Have removed it for now. Issue is, artifacts page is for 1 single feed entry, but the search results are coming from the entire table, instead they should come fot the same feed entry on which we are searching.

# DO IT LATER (IF NEEDED)
- [ ] Sort option in search bar
- [ ] Change title in the header in all pages



## TODO onborading & integration
- [ ] Sort by date not working on Soar Customer
- [ ] Move StatusButton to a separate component
- [ ] Search not working on SaaS Products
- [ ] Spaces are left on each individual page
- [ ] Bigger names are not looking good on Table Header, like AWS Customers
- [ ] When switching between tabs in onboarding section i.e. b/w SaaS Products & Soar Customer. If had Add New wala tab open & closed on one section, then there's issue when I navigate to the another section.
- [ ] Pagination count fix
- [x] Rating to be taken from ML Model everywhere
- [ ] bg of table while adding filed_in_logs. Also, table design is not as per the Figma design


- [ ] Pagination to be updated dynamically
- [ ] Rating is working perfectly fine
- [ ] In RSS Board, status will be Approved only, not Mark as Completed

- [ ] Status Sort not working on any page