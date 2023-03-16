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
- [x] complete graph
- [x] destination detection
- [x] draw hold bars when plotting input route
- [ ] play test
- [ ] write unit tests, particularly for functions in js files

### Bugs
- [x] fix path doubling back when route starts with turn off current segment (low priority, instructions *shouldn't* be given)
- [x] stop 'wrong turn' detection if turning onto stand
- [x] fix doubled-back path drawn if user passes by point proximity detection radius
- [x] when current position in two or more segments, don't change current segment if current segment is one of them, otherwise pick first
- [x] remove drawn paths when instructions input is (manually) cleared
- [x] sometimes shortest route (by pixels) not picked (e.g, KA K P) 
- [x] fix `L Q /Q1` from blue section between segments to the left of S112 (drawn path doubles back)
- [x] if terminating holding point is first point on taxiway not included in instructions then invalid route (e.g A1 via AS) 
- [x] 'invalid route' when in segment that contains holding point that trying to route to
- [x] remove aircraft and path plots if connection to sim lost
- [ ] route instructions cleared when position updated and route invalid
- [ ] fix wrong turn detection misfiring - when in two segments, check if one is in current route or contains route terminator and if so pick that one
- [ ] fix path finding onto stand opposite end of taxiway (e.g., 564 from QC)
- [ ] fix wrong/missing directions when turning off current or first after current taxiway segment - e.g. S574 segment onto QC
- [ ] naive segment detection is causing routing anomolies in congested areas (e.g. sat at P/J/Z intersection going to /P1)
        when regexing route instructions, check if current point is on first taxiway provided before implicitly adding current segment
        then change current segment if found
        otherwise check if route is shorter using the different segments available (need to think of shortcut for this)


### QOL 
- [x] support implicit first taxiway
- [x] create boundary zone for 26L/08R
- [x] update instructions modal with runway and maintenance area formats
- [ ] create tool to simulate aircraft position when sim not connected
- [ ] create object with 'wide view' bounds of each taxiway (rough outline containing stands and all taxiway segments of named taxiway)
- [ ] button to trigger route parsing to improve performance or a delay after typing finished

### Potential Future Improvements
- [ ] too keenly adding implicit last taxiway - e.g. on L putting just /q1 draws the full route, also putting Q /Q1 shows invalid route. 
        Should remove this but need to look at holding point at first points on new taxiway and also those on different twy (e.g. A2, W1)
- [ ] invalidate routes requiring a single turn of more than approx 100 degrees
- [ ] improve location data update efficiency and increase frequency
- [ ] improve plotting accuracy
- [ ] focus pan/zoom on aircraft location? 
- [ ] add fancy curves between route segments
- [ ] add direction counter - i.e. take third right instead of turn right
- [ ] rewrite position reporting to have server in js client rather than c#