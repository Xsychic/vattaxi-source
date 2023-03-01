## TO-DO LIST

### PRIORITIES
- [x] write script which creates list of objects containing bounds and reference to relevant segment
- [x] write script which gets current segment from aircraft px coords list of bounds
- [x] implement route parsing algorithm
- [x] implement simple route drawing
        -> only redraw first segment
- [x] write script to check format of route input box 
        -> starts with taxiway
        -> at least 2 elements in route
        -> terminates at stand/holding point
        -> contains existing instructions (stand/taxiway/holding point exist)
- [x] implement directions algorithm
- [ ] wrong turn detection - visual alert, don't fire if entering a stand
- [ ] complete graph
- [x] destination detection


### Bugs
- [ ] when current position in two or more segments, don't change current segment if current segment is one of them, otherwise pick first
- [ ] fix `L Q /Q1` from blue section between segments to the left of S112 (drawn path doubles back)
- [x] fix doubled-back path drawn if user passes by point proximity detection radius
- [ ] remove aircraft and path plots if connection to sim lost
- [ ] remove drawn paths when instructions input is (manually) cleared
- [x] stop 'wrong turn' detection if turning onto stand
- [ ] fix wrong turn detection misfiring (possibly fixed by 1)
- [ ] fix path finding onto stand opposite end of taxiway (e.g., 564 from QC)
- [ ] fix wrong/missing directions when turning off current or first after current taxiway segment - e.g. S574 segment onto QC

### QOL 
- [x] support implicit first taxiway
- [ ] create object with 'wide view' bounds of each taxiway (rough outline containing stands and all taxiway segments of named taxiway)
- [ ] focus pan/zoom on aircraft location? 
- [ ] add fancy curves between route segments
- [ ] rewrite position reporting to have server in js client rather than c#
- [ ] add direction counter - i.e. take third right instead of turn right

### ON HOLD
- [ ] write unit tests, particularly for functions in js files