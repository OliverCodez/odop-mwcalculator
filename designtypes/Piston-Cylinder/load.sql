INSERT INTO `design` (`created_at`, `updated_at`, `user`, `type`, `name`, `value`) VALUES 
('2022-01-30 21:16:33','2022-01-30 21:16:33',NULL,'Piston-Cylinder','Startup','{\"symbol_table\":[{\"input\":true,\"name\":\"PRESSURE\",\"value\":500,\"units\":\"LB/SQ-IN\",\"lmin\":0,\"lmax\":1,\"cmin\":0,\"cmax\":1500,\"ioclass\":0,\"sdlim\":0,\"tooltip\":\"Gas PRESSURE applied to piston AREA\",\"type\":\"equationset\",\"hidden\":false,\"smin\":1e-7,\"smax\":1500.0000001,\"vmax\":-0.6666666666222222},{\"input\":true,\"name\":\"RADIUS\",\"value\":0.4,\"units\":\"INCH\",\"lmin\":1,\"lmax\":1,\"cmin\":0,\"cmax\":0.5,\"ioclass\":0,\"sdlim\":0,\"tooltip\":\"Piston dimension; creates AREA where PRESSURE is applied\",\"type\":\"equationset\",\"hidden\":false,\"smin\":1e-7,\"smax\":0.5000001,\"vmin\":-4000000.0000000005,\"vmax\":-0.19999996000000797},{\"input\":true,\"name\":\"THICKNESS\",\"value\":0.04,\"units\":\"INCH\",\"lmin\":1,\"lmax\":1,\"cmin\":0,\"cmax\":0.05,\"ioclass\":0,\"sdlim\":0,\"tooltip\":\"Dimension of cylinder wall providing containment for PRESSURE\",\"type\":\"equationset\",\"hidden\":false,\"smin\":1e-7,\"smax\":0.050000100000000006,\"vmin\":-400000,\"vmax\":-0.19999960000080003},{\"input\":false,\"name\":\"FORCE\",\"value\":251.32741228718348,\"units\":\"LBS.\",\"lmin\":1,\"lmax\":0,\"cmin\":1000,\"cmax\":0,\"ioclass\":0,\"sdlim\":0,\"tooltip\":\"Push generated by PRESSURE acting on piston AREA\",\"type\":\"equationset\",\"hidden\":false,\"smin\":1000.0000001,\"smax\":1e-7,\"vmin\":0.7486725876379493},{\"input\":false,\"name\":\"AREA\",\"value\":0.5026548245743669,\"units\":\"SQ.-IN.\",\"lmin\":0,\"lmax\":0,\"cmin\":0,\"cmax\":0,\"ioclass\":0,\"sdlim\":0,\"tooltip\":\"Effective amount of piston surface exposed to PRESSURE\",\"type\":\"equationset\",\"hidden\":false,\"smin\":1e-7,\"smax\":1e-7},{\"input\":false,\"name\":\"STRESS\",\"value\":2500,\"units\":\"PSI\",\"lmin\":0,\"lmax\":1,\"cmin\":0,\"cmax\":3000,\"ioclass\":0,\"sdlim\":0,\"tooltip\":\"Force per unit area within cylinder wall; created by PRESSURE\",\"type\":\"equationset\",\"hidden\":false,\"smin\":1e-7,\"smax\":3000.0000001,\"vmax\":-0.16666666666111113}],\"labels\":[{\"name\":\"COMMENT\",\"value\":\"PCYL Default startup file ...\"}],\"version\":\"5\",\"result\":{\"objective_value\":0.5605106434805028,\"termination_condition\":\"Use Search button to find a feasible design\",\"violated_constraint_count\":1},\"jsontype\":\"ODOP\",\"units\":\"US\",\"system_controls\":{\"ioopt\":3,\"maxit\":100,\"weapon\":1,\"nmerit\":1,\"fix_wt\":1.5,\"con_wt\":1,\"zero_wt\":10,\"viol_wt\":1,\"mfn_wt\":0.01,\"objmin\":0.00005,\"del\":1,\"delmin\":0.0001,\"tol\":0.0001,\"smallnum\":1e-7,\"show_units\":1,\"show_violations\":1,\"enable_auto_fix\":1}}');
