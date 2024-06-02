<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreTaskRequest;
use App\Http\Requests\UpdateTaskRequest;
use App\Http\Resources\ProjectResource;
use App\Http\Resources\TaskResource;
use App\Http\Resources\UserResource;
use App\Models\Project;
use App\Models\Task;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Inertia\Response;
use Inertia\ResponseFactory;

class TaskController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): Response|ResponseFactory|RedirectResponse
    {
        $user = Auth::user();

        $query = Task::query();

        $sortField = request("sort_field", 'created_at');
        $sortDirection = request("sort_direction", "desc");

        if (request("name")) {
            $query->where("name", "like", "%" . request("name") . "%");
        }
        if (request("status")) {
            $query->where("status", request("status"));
        }

        if ($user->can('manage_tasks')) {
            if (!$user->can('manage_own_tasks')) {
                $query->where("assigned_user_id", $user->id);
            } else {
                $query->whereRaw('1 = 0'); // No results will be returned
            }
        }

        $tasks = $query->orderBy($sortField, $sortDirection)
            ->paginate(10)
            ->onEachSide(1);

        return inertia("Task/Index", [
            "tasks" => TaskResource::collection($tasks),
            'queryParams' => request()->query() ?: null,
            'success' => session('success'),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(): Response|ResponseFactory|RedirectResponse
    {

        $user = Auth::user();
        if ($user->can('manage_tasks')) {
            return to_route('task.index')->with('warning', 'You do not have permission to create tasks.');
        }


        $projects = Project::query()->orderBy('name', 'asc')->get();
        $users = User::query()->orderBy('name', 'asc')->get();

        return inertia("Task/Create", [
            'projects' => ProjectResource::collection($projects),
            'users' => UserResource::collection($users),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreTaskRequest $request): RedirectResponse
    {
        $data = $request->validated();
        /** @var $attachment UploadedFile */
        $attachment = $data['task_attachment'] ?? null;
        $data['created_by'] = Auth::id();
        $data['updated_by'] = Auth::id();

        if ($attachment) {
            $data['attachment_path'] = $attachment->store('task_attachments/' . Str::random(), 'public');
        }

        Task::create($data);

        return to_route('task.index')
            ->with('success', 'Task was created');
    }


    /**
     * Display the specified resource.
     */
    public function show(Task $task): Response|ResponseFactory
    {
        $task->load(['replies.repliedBy']);
        return inertia('Task/Show', [
            'task' => new TaskResource($task),
        ]);
    }


    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Task $task): Response|ResponseFactory
    {
        $projects = Project::query()->orderBy('name', 'asc')->get();
        $users = User::query()->orderBy('name', 'asc')->get();

        return inertia("Task/Edit", [
            'task' => new TaskResource($task),
            'projects' => ProjectResource::collection($projects),
            'users' => UserResource::collection($users),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateTaskRequest $request, Task $task): RedirectResponse
    {
        $data = $request->validated();
        $attachment = $data['task_attachment'] ?? null;
        $data['updated_by'] = Auth::id();

        if ($attachment) {
            if ($task->task_attachment) {
                Storage::disk('public')->delete($task->task_attachment);
            }
            $data['task_attachment'] = $attachment->store('tasks/' . Str::random(10), 'public');
        }

        $task->update($data);

        return to_route('task.index')
            ->with('success', "Task \"{$task->name}\" was updated");
    }


    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Task $task): RedirectResponse
    {
        $name = $task->name;
        $task->delete();
        if ($task->image_path) {
            Storage::disk('public')->deleteDirectory(dirname($task->image_path));
        }
        return to_route('task.index')
            ->with('success', "Task \"$name\" was deleted");
    }

    public function myTasks(): Response|ResponseFactory
    {
        $user = auth()->user();
        $query = Task::query()->where('assigned_user_id', $user->id);

        $sortField = request("sort_field", 'created_at');
        $sortDirection = request("sort_direction", "desc");

        if (request("name")) {
            $query->where("name", "like", "%" . request("name") . "%");
        }
        if (request("status")) {
            $query->where("status", request("status"));
        }

        $tasks = $query->orderBy($sortField, $sortDirection)
            ->paginate(10)
            ->onEachSide(1);

        return inertia("Task/Index", [
            "tasks" => TaskResource::collection($tasks),
            'queryParams' => request()->query() ?: null,
            'success' => session('success'),
        ]);
    }
}
