const { mapData } = require('../main/mapper.js');

describe('the mapper', () => {
  it('maps the payload', () => {
    /*

    Water Detect specification
==========================

Big endian (MSB first) two hex characters per byte.

Txflags (1 Byte)
Sensor.WaterPresent(1 Byte)
Sensor.Water(1 Byte)
Sensor.Battery (1 Byte)
RTX.Value (4 Bytes)

Description:
Txflags(8 bit) are a bit mask as follows:
0 (1) = Power Up (Ignore content may not be valid)
1 (2) = State Change (Will be sent 15 -20 seconds after change)
2 (4) = Periodic Update (Keep alive message currently sent once every 12hours)

WaterPresent(8 bit) is a boolean
0 = NoWater/ False
1 = WaterDetected / True

Water(8 bit)is the raw analogue value more for info purposes
>= 200 Nowater
<= 150 Water is present

Battery(8 bit) is the converted value of the battery apply the following formula to get back to volts

V = Value X 0.0209

RTX.Value(32 bit)is just a free running counter running 1 second increments, it can be used as a time reference.

*/
    const result = mapData('0400ff9503542d85');

    expect(result).toEqual({
      periodicUpdate: true,
      stateChange: false,
      powerUp: false,
      waterPresent: false,
      waterLevel: 255,
      battery: 3.11,   //rounded to 2dp
      rtx: 55848325
    })
  })
})