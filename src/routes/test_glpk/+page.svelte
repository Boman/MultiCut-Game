<script lang="ts">
    import {glpkConstants, solve, write} from '$lib/graph/glpk-utils.ts'

    let out = ''

    const options = {
        msglev: glpkConstants.GLP_MSG_ON,
        cb: {
            call: res => {
                console.log(res)
                out += JSON.stringify(res) + '    '
            },
            each: 1
        }
    }
    const lp = {
        name: 'LP',
        objective: {
            direction: glpkConstants.GLP_MAX,
            name: 'obj',
            vars: [
                {name: 'x1', coef: 0.6},
                {name: 'x2', coef: 0.5}
            ]
        },
        subjectTo: [
            {
                name: 'cons1',
                vars: [
                    {name: 'x1', coef: 1.0},
                    {name: 'x2', coef: 2.0}
                ],
                bnds: {type: glpkConstants.GLP_UP, ub: 1.0, lb: 0.0}
            },
            {
                name: 'cons2',
                vars: [
                    {name: 'x1', coef: 3.0},
                    {name: 'x2', coef: 1.0}
                ],
                bnds: {type: glpkConstants.GLP_UP, ub: 2.0, lb: 0.0}
            }
        ],
        binaries: ['x1', 'x2']
    }

    let w = write(lp)
    let out2 = ''

    ;(async () => {
        out2 = await w//JSON.stringify(await w)
    })()

    const sol = solve(lp, options)
</script>

<div>{out}</div>
<div>{out2}</div>
