const ipScanning = async ({ ipPrefix, scanStartPort, scanEndPort }) => {
  const list = []

  for (let i = scanStartPort; i < scanEndPort; i++) {
    const ip = `${ipPrefix}${i}`

    try {
      const res = await $`ping -t 1 -c 1 ${ip}`
      if (res.stdout.includes('round-trip min/avg/max/stddev')) {
        list.push(res.stdout)
      }
    } catch (error) {}
  }

  console.log(`success: ${list.length}`)

  list.forEach(item => {
    console.log(item)
  })
}

const config = {
  ipPrefix: `58.23.20.`,
  scanStartPort: 0,
  scanEndPort: 10,
}

ipScanning(config)
