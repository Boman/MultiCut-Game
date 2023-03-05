import gurobipy as gp

model = gp.read("testdata_01.lp")
model.optimize()
print(model.getVars())