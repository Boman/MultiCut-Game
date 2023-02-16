<script lang="ts">
    import {glpkConstants, solve} from '$lib/graph/glpk-utils.ts'

    const options = {
        msglev: glpkConstants.GLP_MSG_ALL,
        presol: true,
        cb: {
            call: progress => console.log(progress),
            each: 1
        }
    }
    const res = solve(
        {
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
            ]
        },
        options
    )
</script>

<div />
