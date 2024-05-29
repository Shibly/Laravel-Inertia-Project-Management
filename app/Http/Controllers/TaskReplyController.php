<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreReplyRequest;
use App\Http\Requests\UpdateReplyRequest;
use App\Models\Reply;
use Illuminate\Http\RedirectResponse;

class TaskReplyController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreReplyRequest $request): RedirectResponse
    {
        $validated = $request->validated();


        if ($request->hasFile('attachment')) {
            $filePath = $request->file('attachment')->store('reply_attachments', 'public');
            $validated['attachment_path'] = $filePath;
        }
        Reply::create($validated);

        return to_route('task.show', $validated['task_id'])->with('success', 'Reply added successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Reply $reply)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Reply $reply)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateReplyRequest $request, Reply $reply)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Reply $reply)
    {
        //
    }
}
