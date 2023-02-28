## TO-DO LIST

### PRIORITIES
- [x] write script which creates list of objects containing bounds and reference to relevant segment
- [ ] create object with 'wide view' bounds of each taxiway (rough outline containing stands and all taxiway segments of named taxiway)
- [x] write script which gets current segment from aircraft px coords list of bounds
- [x] implement route parsing algorithm
- [x] implement simple route drawing
        -> only redraw first segment
- [x] write script to check format of route input box 
        -> starts with taxiway
        -> at least 2 elements in route
        -> terminates at stand/holding point
        -> contains existing instructions (stand/taxiway/holding point exist)
- [ ] implement directions algorithm
- [ ] wrong turn detection - visual alert, don't fire if entering a stand
- [ ] complete graph
- [x] destination detection


### Bugs
- [ ] fix `L Q /Q1` from blue section between segments to the left of S112 (drawn path doubles back)
- [x] fix doubled-back path drawn if user passes by point proximity detection radius
- [ ] remove aircraft and path plots if connection to sim lost
- [x] stop 'wrong turn' detection if turning onto stand

### QOL 
- [x] support implicit first taxiway
- [ ] focus pan/zoom on aircraft location? 
- [ ] add fancy curves between route segments
- [ ] rewrite position reporting to have server in js client rather than c#

### ON HOLD
- [ ] write unit tests, particularly for functions in js files