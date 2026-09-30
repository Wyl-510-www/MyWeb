规范驱动开发

项目层面指定宪法 “constitution”，定义不可变标准。然后进行特性迭代循环

每个循环都在独立的分支上面进行规划、实现、验证功能。

在特性之间保持干净环境 减少切换负担。

这种工作流同时适用于新建项目和改造项目！

# 新建项目

在新的项目中，你通过与智能体的对话，来制定这份项目宪章；在改造项目中，需要处理现有的代码库，你将依据现有的代码库，生成项目宪章。

Constitution包含:

Mission.md

Tech Stack.md

RoadMap.md

!image.png

!image.png

首先，创建项目的宪法。
We are writing AgentClinic, a place for AI agents to get relief from their humans. Look in the README.md for input from stakeholders.
Let's create a "constitution" in a specs directory:

`mission.md`

`tech-stack.md`

`roadmap.md` for high-level implementation order, in very small phases of work.

Important: You *must* use your AskUserQuestion tool, grouped on these 3, before writing to disk.

其次，清空上下文，为第一阶段的任务制定计划。
Find the next phase on specs/roadmap.md and make a branch, ask me about the feature spec.  
Create:

- A new directory YYYY-MM-DD-feature-name under specs for this feature work
- In there  
  -‘plan.md' as a series of numbered task groups  
  -‘requirements.md ’for the scope, decisions, context
- ‘validation.md’ for how to know the implementation succeeded and can be merged

Refer to specs/mission.md and specs/tech-stack.md for guidance.  
Important: You *must* use your AskUserQuestion tool, grouped on these 5, before writing to  disk.

然后，`implement the remaining task groups` ,正式开启第一阶段的任务。完成之后，要同步roadmap的进度、已经第一阶段计划中validation的进度。

接着，观察效果，发现与自己预期不符合的地方，和agent进行交流，进行修改。这一过程称之为‘人类在环’。

!image.png

I have the full diff. Spawing three reviewers in parallel.深度审核让代理有更多空间思考变更，并通过子代理避免污染主代理的上下文窗口。

针对现有规格给出指导.把这个最小的产品作为宪章与功能规格的极限测试，如果现在的结果偏理论预期目标，那么我们必须负责地重新规划，纠正让智能体误导的原因。

Go through the features on specs/roadmap.md, make a mvp branch,and ask me about the features specs needed to complete an mvp.
Create :

- A new directory under specs for this feature work
- In there:
    - - ‘plan.md’ for this task list
    - - ‘requirements.md’ for the scope,decisions,context
    - - ‘validation.md’ for how to know the implemention succeeded and can be merged

Refer to specs/mission.md and  specs/tech-stack.md plus the existing feature specs for guidance.

Important : You *must* use your AskUserQuestion tool, grouped on these 5, before writing to  disk.

许多规格文件始于与智能体的反复对话，审查规格文件是一件必要的事情！！！！

因为你会发现智能体为了填补空白而做出的错误假设。

通过这个，智能体可以指出最小版本MVP在规划中存在的漏洞，我们可以将此次评估分享给相关方进行最小版本审查，然后合并或者归档该分支。

# 改造项目